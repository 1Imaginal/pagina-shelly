from pathlib import Path
from pypdf import PdfReader
import json,re
r=PdfReader(next(Path('C:/Users/sofia/Downloads').glob('*TextosCompletos.pdf')))
pages=[p.extract_text() for p in r.pages]
def clean(s): return re.sub(r'\s+',' ',s).strip()
def body(s,start,end,markers):
    s=s.split(start,1)[1].split(end,1)[0]
    for m in markers: s=s.replace(m,'\n\n'+m)
    return [clean(p) for p in s.split('\n\n') if clean(p)]
d='\n'.join(pages[9:11]); p='\n'.join(pages[11:13]); bio='\n'.join(pages[14:16])
data={'texts':[
 {'author':'David Mateo','en':{'title':'Anatomies of Persistence','subtitle':'(fragments)','paragraphs':body(d,'ENSAYO · INGLÉS','Firma:', ['In her compositions,','At moments,','Heme Aquí signals'])},'es':{'title':'Anatomías de la persistencia','subtitle':'(fragmentos)','paragraphs':body(d,'ENSAYO · ESPAÑOL','Firma:', ['En sus singulares','En varias ocasiones','“Heme aquí” es'])}},
 {'author':'Pancho López','en':{'title':'Here I Am: Shelly Sarfati','subtitle':'An affirmation of life, presence, and freedom','paragraphs':body(p,'ENSAYO · INGLÉS','Firma:', ['Native to the desert,','At the heart','This body of work'])},'es':{'title':'Heme aquí: Shelly Sarfati','subtitle':'Una afirmación de vida, presencia y libertad','paragraphs':body(p,'ENSAYO · ESPAÑOL','Firma:', ['Habitante natural','Entre estas imágenes,','Este cuerpo de obra'])}}],
 'bio':{'en':body(bio,'BIO · INGLÉS','BIO · ESPAÑOL',['She began','Her work has','Through her practice,']),'es':body(bio,'BIO · ESPAÑOL','CV \nNota:', ['Inició sus estudios','Su obra ha sido','A través de su trabajo'])}}
cv='\n'.join(pages[15:17]).split('EDUCACIÓN',1)[1]
categories=['EDUCACIÓN','EXPOSICIONES INDIVIDUALES','EXPOSICIONES COLECTIVAS','PUBLICACIONES Y PRENSA','Premios y reconocimientos']
cv='EDUCACIÓN\n'+cv
data['cv']=[]
for i,cat in enumerate(categories):
    section=cv.split(cat,1)[1].split(categories[i+1],1)[0] if i+1<len(categories) else cv.split(cat,1)[1]
    entries=[]
    for line in section.splitlines():
        line=line.strip()
        if not line: continue
        match=re.match(r'^(\d{4}(?:\s*-\s*\d{4})?)\s+(.*)',line)
        if match: entries.append({'year':match[1].replace(' ',''),'text':match[2]})
        elif entries: entries[-1]['text']+=' '+line
    entries.sort(key=lambda e: int(e['year'].split('-')[0]), reverse=True)
    data['cv'].append({'title':cat,'entries':entries})
Path('content.js').write_text('window.SHELLY_CONTENT = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
