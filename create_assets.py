from pathlib import Path
import math, random, wave
import numpy as np

out=Path(__file__).parent/'public'/'memories'
out.mkdir(parents=True,exist_ok=True)

def scene(inner, a='#ead7c7',b='#ffefda', extra=''):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="680" height="790" viewBox="0 0 680 790" role="img">
      <defs>
       <linearGradient id="bg" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="{a}"/><stop offset="1" stop-color="{b}"/></linearGradient>
       <radialGradient id="light"><stop stop-color="#fffdf4" stop-opacity=".8"/><stop offset="1" stop-color="#fffdf4" stop-opacity="0"/></radialGradient>
       <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency=".32" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".11"/></feComponentTransfer></filter>
       <filter id="blur"><feGaussianBlur stdDeviation="8"/></filter>
      </defs>
      <rect width="680" height="790" fill="url(#bg)" />
      {inner}
      {extra}
      <rect width="680" height="790" filter="url(#noise)" opacity=".075" pointer-events="none"/>
      <rect x="20" y="20" width="640" height="750" rx="8" fill="none" stroke="#fffdf8" stroke-opacity=".38" stroke-width="2"/>
    </svg>'''

def flower(x,y,s=1,col='#f3ce70'):
    petals=[]
    for k in range(5):
        a=k*72
        petals.append(f'<ellipse cx="0" cy="-21" rx="15" ry="29" fill="{col}" stroke="#e2a880" stroke-opacity=".35" stroke-width="1" transform="rotate({a})"/>')
    return f'<g transform="translate({x} {y}) scale({s})">'+''.join(petals)+'<circle r="11" fill="#b1855b"/><circle r="4" cx="-3" cy="-3" fill="#e8bb74"/></g>'

def leaf(x,y,theta=0):
    return f'<ellipse cx="{x}" cy="{y}" rx="11" ry="23" fill="#9bad89" opacity=".76" transform="rotate({theta} {x} {y})"/>'

def make_garden():
    parts=['<circle cx="350" cy="275" r="260" fill="url(#light)"/>','<path d="M0 570 Q170 515 340 580 T680 540 L680 790 H0Z" fill="#b6c2a4" opacity=".42"/>']
    random.seed(22)
    for i in range(21):
        x=random.randint(52,640); y=random.randint(300,690); s=random.uniform(.52,1.18)
        parts.append(f'<path d="M{x} {y+22*s} Q{x-20} {y+100} {x+12} 800" fill="none" stroke="#7f9a76" stroke-width="{random.uniform(2,5):.1f}" opacity=".66"/>')
        parts.append(leaf(x+random.randint(-20,20),y+random.randint(40,85),random.randint(-50,50)))
        parts.append(flower(x,y,s,random.choice(['#e8c56e','#ffe5a0','#f5d58f','#f7df9c'])))
    parts.append('<text x="344" y="126" text-anchor="middle" fill="#ad8384" font-size="29" font-family="Georgia,serif" font-style="italic">the little things bloom</text>')
    (out/'buttercup-garden.svg').write_text(scene(''.join(parts),'#f6d6cf','#f8edd5'))

def make_sky():
    parts=['<circle cx="480" cy="205" r="170" fill="url(#light)"/>','<circle cx="480" cy="205" r="104" fill="#fff6df" opacity=".64"/>']
    for x,y,w in [(60,155,210),(330,260,300),(120,350,175),(-10,290,130),(500,135,180)]:
        parts.append(f'<g fill="#fff2ed" opacity=".72"><ellipse cx="{x}" cy="{y}" rx="{w*.65}" ry="38"/><ellipse cx="{x+40}" cy="{y-29}" rx="{w*.47}" ry="48"/><ellipse cx="{x-45}" cy="{y-5}" rx="{w*.45}" ry="35"/></g>')
    parts.append('<path d="M0 570 Q150 470 270 565 T680 520 V790 H0" fill="#c9b7c4" opacity=".58"/><path d="M0 640 Q170 555 350 655 T680 585 V790 H0" fill="#9fadb0" opacity=".5"/>')
    parts.append('<text x="340" y="741" text-anchor="middle" font-family="Georgia" font-style="italic" font-size="26" fill="#fff9f4">a sky worth remembering</text>')
    (out/'pink-sky.svg').write_text(scene(''.join(parts),'#e3bdcc','#f6d3c2'))

def make_cafe():
    parts=['<rect x="70" y="60" width="540" height="495" rx="130" fill="#f7eddf" stroke="#c7a898" stroke-width="23"/>',
           '<rect x="112" y="107" width="456" height="405" rx="100" fill="#e2ccca"/>',
           '<circle cx="450" cy="255" r="78" fill="#fff0cb" opacity=".8"/>',
           '<path d="M112 440 Q250 315 350 440 T568 420 V512 H112Z" fill="#b5c1ab"/>',
           '<path d="M340 112 V512 M112 295 H568" stroke="#c7a898" stroke-width="22"/>',
           '<rect x="0" y="528" width="680" height="262" fill="#c89e8e"/>',
           '<path d="M0 552 H680" stroke="#f4d7c2" stroke-width="23"/>']
    for x in (215,420):
        parts.extend([f'<ellipse cx="{x}" cy="665" rx="122" ry="27" fill="#805950" opacity=".17"/>',
             f'<path d="M{x-76} 570 L{x+63} 570 Q{x+58} 665 {x-2} 670 Q{x-64} 658 {x-76} 570" fill="#f8eadf" stroke="#e1d0c0" stroke-width="5"/>',
             f'<path d="M{x+64} 590 Q{x+117} 571 {x+109} 627 Q{x+90} 654 {x+55} 639" fill="none" stroke="#f8eadf" stroke-width="17"/>',
             f'<ellipse cx="{x-4}" cy="575" rx="71" ry="22" fill="#7f5b4e"/>',
             f'<path d="M{x-22} 530 Q{x-40} 492 {x-9} 463" fill="none" stroke="#fffdf4" stroke-opacity=".47" stroke-width="5"/>'])
    (out/'little-cafe.svg').write_text(scene(''.join(parts),'#e7c9bd','#f5e9d7'))

def make_moon():
    random.seed(18)
    parts=['<circle cx="465" cy="204" r="104" fill="#fff2cd" opacity=".16" filter="url(#blur)"/><circle cx="456" cy="205" r="73" fill="#f8eccd"/>',
           '<circle cx="485" cy="183" r="66" fill="#a6a2be"/>']
    for i in range(80):
        x=random.randrange(20,665); y=random.randrange(20,580); r=random.choice([1.6,2.6,3.5])
        parts.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fff6e2" opacity="{random.uniform(.3,.9):.1f}"/>')
    parts.extend(['<path d="M0 640 Q160 520 300 610 T680 565 V790 H0Z" fill="#767f9d" opacity=".75"/>',
        '<path d="M0 695 Q230 598 390 695 T680 642 V790 H0Z" fill="#565c79" opacity=".8"/>',
        '<text x="340" y="718" fill="#eee5ee" font-family="Georgia" font-size="27" font-style="italic" text-anchor="middle">the stars know</text>'])
    (out/'moonlight.svg').write_text(scene(''.join(parts),'#9994b7','#d5b3c1'))

def make_letter():
    parts=['<rect x="107" y="90" width="485" height="620" rx="3" transform="rotate(5 350 390)" fill="#c59799" opacity=".25"/>',
           '<rect x="104" y="80" width="470" height="625" rx="3" transform="rotate(-3 350 390)" fill="#fff7e8" stroke="#e3c6b1" stroke-width="4"/>',
           '<g transform="rotate(-3 350 390)">',
           '<text x="158" y="160" fill="#b48390" font-family="Georgia" font-size="31" font-style="italic">Dear you,</text>',
           '<path d="M159 200 H510 M159 247 H510 M159 294 H465 M159 341 H510 M159 388 H475 M159 435 H510 M159 482 H440" stroke="#c5ada4" stroke-width="2" opacity=".45"/>',
           '<text x="182" y="593" fill="#aa7786" font-family="Georgia" font-size="28" font-style="italic">with love ♡</text></g>',
           '<path d="M456 646 Q500 490 465 300" stroke="#799a78" stroke-width="5" fill="none"/>',
           '<ellipse cx="488" cy="508" rx="22" ry="47" fill="#91aa89" transform="rotate(35 488 508)"/>',
           '<ellipse cx="450" cy="561" rx="19" ry="43" fill="#90a58a" transform="rotate(-48 450 561)"/>',
           flower(462,312,1.45,'#efd185')]
    (out/'flower-letter.svg').write_text(scene(''.join(parts),'#efcbd0','#f5e9d8'))

def make_sunset():
    parts=['<circle cx="445" cy="328" r="170" fill="url(#light)"/>','<circle cx="446" cy="332" r="100" fill="#f8d5ab" opacity=".87"/>',
      '<path d="M0 505 Q138 465 280 515 T680 478 L680 790 H0Z" fill="#d2b6a2"/>',
      '<path d="M0 593 Q170 501 320 595 T680 548 L680 790 H0Z" fill="#acb29e"/>',
      '<path d="M0 666 Q150 562 315 674 T680 612 L680 790 H0Z" fill="#849685"/>']
    random.seed(4)
    for i in range(17):
        x=random.randrange(18,665); y=random.randrange(615,810); s=random.uniform(.32,.7)
        parts.append(f'<path d="M{x} {y} L{x+10} 792" stroke="#647f64" stroke-width="3"/>')
        parts.append(flower(x,y,s,random.choice(['#fae4af','#f3d69b','#f5e5c5'])))
    (out/'sunset-field.svg').write_text(scene(''.join(parts),'#e9bfb9','#f7ddb9'))

make_garden(); make_sky(); make_cafe(); make_moon(); make_letter(); make_sunset()

favicon=Path(__file__).parent/'public'/'favicon.svg'
favicon.write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="17" fill="#fff8f2"/>'''+''.join(f'<ellipse cx="32" cy="19" rx="10" ry="15" fill="#f4ce71" stroke="#d9b262" transform="rotate({a} 32 32)"/>' for a in range(0,360,72))+'''<circle cx="32" cy="32" r="8" fill="#a7794e"/></svg>''')

# Original synthesized calm instrumental placeholder: plucked keys & soft warm pads.
sr=22050
bpm=78
beat=60/bpm
notes=[(0,261.63),(1,329.63),(2,392.00),(3,523.25),(4,392.00),(5,329.63),(6,293.66),(7,349.23),
       (8,261.63),(9,329.63),(10,440.00),(11,392.00),(12,349.23),(13,293.66),(14,261.63),(15,392.00),
       (16,349.23),(17,440.00),(18,523.25),(19,659.25),(20,587.33),(21,523.25),(22,440.00),(23,392.00),
       (24,349.23),(25,293.66),(26,261.63),(27,329.63),(28,392.00),(29,349.23),(30,329.63),(31,261.63)]
length=(32*beat+1.5)
N=int(length*sr)
audio=np.zeros(N,dtype=np.float64)
for step,freq in notes:
    start=int((step*beat)*sr); dur=int((beat*1.5)*sr)
    t=np.arange(dur)/sr
    envelope=np.exp(-t*3.8)+.16*np.exp(-t*.85)
    pluck=(np.sin(2*np.pi*freq*t)*.67 + np.sin(2*np.pi*freq*2.02*t)*.19 + np.sin(2*np.pi*freq*3.99*t)*.08)
    n=min(dur,N-start)
    audio[start:start+n]+=pluck[:n]*envelope[:n]*.135
for step,root in [(0,130.81),(8,146.83),(16,174.61),(24,130.81)]:
    start=int(step*beat*sr); dur=int(8*beat*sr)
    t=np.arange(dur)/sr
    env=np.sin(np.linspace(0,np.pi,dur))**.5
    warm=(np.sin(2*np.pi*root*t)+.35*np.sin(2*np.pi*root*1.002*t)+.4*np.sin(2*np.pi*root*1.5*t))
    audio[start:start+dur]+=warm*env*.027
# subtle stereo-like echo in mono
shift=int(.16*sr)
audio[shift:]+=audio[:-shift]*.09
fade=min(int(.55*sr),N//3)
audio[:fade]*=np.linspace(0,1,fade)
audio[-fade:]*=np.linspace(1,0,fade)
audio=np.tanh(audio*1.2)
wavpath=Path(__file__).parent/'public'/'audio'/'our-song.wav'
wavpath.parent.mkdir(parents=True,exist_ok=True)
with wave.open(str(wavpath),'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes((audio*32767).astype('<i2').tobytes())
print('Created images:',list(p.name for p in out.iterdir()))
print('Audio:',wavpath.stat().st_size)
