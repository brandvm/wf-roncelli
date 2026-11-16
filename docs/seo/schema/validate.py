import json, re, sys, glob
from collections import defaultdict, Counter
V=json.load(open('vocab/schemaorg.jsonld'))['@graph']
def ids(x):
    if x is None: return []
    x = x if isinstance(x,list) else [x]
    return [i['@id'].replace('schema:','') for i in x]
types=set(); sup=defaultdict(set); dom=defaultdict(set)
for n in V:
    t=n.get('@type'); t=t if isinstance(t,list) else [t]; i=n['@id'].replace('schema:','')
    if 'rdfs:Class' in t: types.add(i); sup[i]|=set(ids(n.get('rdfs:subClassOf')))
    if 'rdf:Property' in t: dom[i]|=set(ids(n.get('schema:domainIncludes')))
def ancestors(t,seen=None):
    seen=seen or set()
    for s in sup.get(t,()):
        if s not in seen: seen.add(s); ancestors(s,seen)
    return seen|{t}
URL=re.compile(r'^https://www\.buildroncelli\.com(/|$)')
ISO=re.compile(r'^\d{4}-\d{2}-\d{2}(T[\d:]+(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$')
def check_node(n,errs,where,ids_,refs):
    if not isinstance(n,dict): return
    if set(n)=={'@id'}: refs.add(n['@id']); return
    t=n.get('@type')
    if not t: errs.append(f'{where}: node without @type'); return
    tl=t if isinstance(t,list) else [t]
    anc=set()
    for x in tl:
        if x not in types: errs.append(f'{where}: unknown type {x}')
        anc|=ancestors(x)
    if '@id' in n: ids_.add(n['@id'])
    for k,v in n.items():
        if k.startswith('@'): continue
        if k not in dom: errs.append(f'{where}: unknown property {t}.{k}'); continue
        if not (dom[k] & anc): errs.append(f'{where}: property {k} not valid on {t}')
        if v in ('',None,[],{}): errs.append(f'{where}: empty {t}.{k}')
        if k in ('url','item') and 'ImageObject' not in tl and isinstance(v,str) and not URL.match(v): errs.append(f'{where}: {k} not absolute site URL: {v}')
        if k in ('datePublished','dateModified') and not ISO.match(str(v)): errs.append(f'{where}: bad date {v}')
        for c in (v if isinstance(v,list) else [v]): check_node(c,errs,where+'>'+str(t),ids_,refs)
    # Google rich-result rules
    if 'BreadcrumbList' in tl:
        items=n.get('itemListElement',[])
        if len(items)<2: errs.append(f'{where}: breadcrumb with <2 items')
        for i,it in enumerate(items):
            if it.get('position')!=i+1: errs.append(f'{where}: breadcrumb position {it.get("position")}')
            if not it.get('name'): errs.append(f'{where}: breadcrumb item without name')
    if 'NewsArticle' in tl:
        if len(n.get('headline',''))>110: errs.append(f'{where}: headline >110 chars')
        if not n.get('datePublished'): errs.append(f'{where}: NewsArticle no datePublished')
        if str(n.get('datePublished','')).startswith('1970'): errs.append(f'{where}: NewsArticle date 1970 (CMS data)')
        if not n.get('image'): errs.append(f'{where}: NewsArticle no image (CMS data)')
    if 'FAQPage' in tl:
        for q in n.get('mainEntity',[]):
            if q.get('@type')!='Question' or not q.get('name') or not q.get('acceptedAnswer',{}).get('text'): errs.append(f'{where}: bad FAQ entry')
    if 'Question' in tl and '<' in str(n.get('acceptedAnswer',{}).get('text','')): pass
def validate(blocks,where):
    errs=[]; ids_=set(); refs=set(); tps=[]
    if not blocks: errs.append(f'{where}: no JSON-LD')
    for b in blocks:
        try: d=json.loads(b)
        except Exception as e: errs.append(f'{where}: INVALID JSON {e}'); continue
        if re.search(r'&(amp|quot|#\d+|#x[0-9a-f]+);',b): errs.append(f'{where}: HTML entity in JSON')
        if d.get('@context')!='https://schema.org': errs.append(f'{where}: @context {d.get("@context")}')
        for n in d.get('@graph',[d]):
            tps.append(n.get('@type')); check_node(n,errs,where,ids_,refs)
    for r in refs-ids_: errs.append(f'{where}: unresolved @id {r}')
    c=Counter(map(str,tps))
    for t,k in c.items():
        if k>1 and t not in ('ListItem',): errs.append(f'{where}: {t} appears {k} times')
    return errs,tps
if __name__=='__main__':
    d=json.load(open(sys.argv[1])); allerr=[]; kinds=Counter()
    for p,r in sorted(d.items()):
        if 'error' in r: allerr.append(f'{p}: load error {r["error"]}'); continue
        e,t=validate(r['blocks'],p); allerr+=e
        if not any(x in ('GeneralContractor',) for x in t): allerr.append(f'{p}: no global block')
        if len(t)<3: allerr.append(f'{p}: no page-level block ({t})')
        kinds[re.sub(r'/[^/]+$','/*',p) if p.count('/')>1 and p.split('/')[1] in ('project','news','market') else p]+=1
    for f in sorted(glob.glob(sys.argv[2]+'/*.jsonld')):
        e,_=validate([open(f).read()],f.split('/')[-1]); allerr+=e
    print(len(d),'pages +',len(glob.glob(sys.argv[2]+'/*.jsonld')),'source files')
    c=Counter(re.sub(r'^[^:]+: ','',x) for x in allerr)
    for k,v in c.most_common(): print(v,'×',k)
    print('\n'.join(x for x in allerr if 'CMS data' not in x)[:4000])
