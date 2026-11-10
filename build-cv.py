from pathlib import Path
import json
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle,PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
data=json.loads(Path('content.js').read_text(encoding='utf-8').split(' = ',1)[1].rstrip(';\n'))
out=Path('assets');out.mkdir(exist_ok=True)
ink=colors.HexColor('#262522')
styles={
 'title':ParagraphStyle('title',fontName='Helvetica',fontSize=28,leading=33,textColor=ink,spaceAfter=22),
 'sub':ParagraphStyle('sub',fontName='Helvetica',fontSize=10,leading=15,textColor=ink,spaceBefore=18,spaceAfter=13),
 'body':ParagraphStyle('body',fontName='Helvetica',fontSize=10,leading=16,textColor=ink,spaceAfter=12),
 'year':ParagraphStyle('year',fontName='Helvetica',fontSize=9,leading=14,textColor=colors.HexColor('#77746f')),
 'entry':ParagraphStyle('entry',fontName='Helvetica',fontSize=10,leading=15,textColor=ink),
}
def para(s,style):return Paragraph(escape(s).replace('—','-').replace('–','-'),styles[style])
story=[para('SHELLY SARFATI','title'),para('BIOGRAFÍA','sub')]
story += [para(p,'body') for p in data['bio']['es']]
story += [Spacer(1,16),para('shellysarfati@gmail.com · instagram.com/shellysarfati','body'),PageBreak(),para('CURRICULUM VITAE','title')]
for category in data['cv']:
    if category['title']=='EXPOSICIONES COLECTIVAS': story.append(PageBreak())
    heading=para(category['title'].upper(),'sub');heading.keepWithNext=True;story.append(heading)
    for entry in category['entries']:
        row=Table([[para(entry['year'],'year'),para(entry['text'],'entry')]],colWidths=[78,417])
        row.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),12)]))
        story.append(row)
def footer(canvas,doc):
    canvas.setStrokeColor(colors.HexColor('#d9d5ce'));canvas.line(50,43,545,43)
    canvas.setFont('Helvetica',8);canvas.setFillColor(colors.HexColor('#77746f'))
    canvas.drawString(50,29,'SHELLY SARFATI / CV & BIO');canvas.drawRightString(545,29,str(doc.page))
SimpleDocTemplate(str(out/'shelly-sarfati-cv.pdf'),pagesize=A4,rightMargin=50,leftMargin=50,topMargin=50,bottomMargin=62,title='Shelly Sarfati - CV / Bio',author='Shelly Sarfati').build(story,onFirstPage=footer,onLaterPages=footer)
