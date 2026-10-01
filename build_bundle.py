import os

brain_dir = r'C:\Users\lfariaso\.gemini\antigravity\brain\17b9f147-8753-4ac5-84eb-c77be9bc66e8'
src_dir = r'c:\Users\lfariaso\.gemini\antigravity\scratch\Página ChessMaipú'

html = open(os.path.join(src_dir, 'index.html'), encoding='utf-8').read()
css = open(os.path.join(src_dir, 'styles.css'), encoding='utf-8').read()
data = open(os.path.join(src_dir, 'data.js'), encoding='utf-8').read()
board = open(os.path.join(src_dir, 'chess-board.js'), encoding='utf-8').read()
app = open(os.path.join(src_dir, 'app.js'), encoding='utf-8').read()

# Replace Tailwind CDN with allowlisted Antigravity gstatic Tailwind CDN
html = html.replace('https://cdn.tailwindcss.com', 'https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js')

# Replace stylesheet link with inline CSS
html = html.replace('<link rel="stylesheet" href="styles.css">', f'<style>\n{css}\n</style>')

# Replace external scripts with inline JS
js_bundle = f'<script>\n{data}\n\n{board}\n\n{app}\n</script>'
html = html.replace('<script src="data.js"></script>', js_bundle)
html = html.replace('<script src="chess-board.js"></script>', '')
html = html.replace('<script src="app.js"></script>', '')

output_path = os.path.join(brain_dir, 'index.html')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)

print('Single-file artifact bundle created successfully at:', output_path)
print('Total file size:', len(html))
