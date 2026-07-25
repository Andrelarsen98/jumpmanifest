import os, glob
from PIL import Image, ImageFilter, ImageDraw

SRC = "frames"
DST = "out"
os.makedirs(DST, exist_ok=True)

W, H = 560, 1176
NAME_X0, NAME_X1 = 44, 300      # where jumper names sit
MID_X0, MID_X1   = 305, 468     # roster rows are EMPTY here; the weather row is not
LAB_X0, LAB_X1   = 470, 550     # right-aligned Tandem / Sport / FS / Wingsuit
TOP_GUARD        = 195          # never touch the sheet header

def classify(px):
    """Per-row flags: gray label on the right, green (= a load row), middle text."""
    gray = [0]*H; green = [0]*H; mid = [0]*H; left = [0]*H
    for y in range(TOP_GUARD, H):
        g = gr = m = l = 0
        for x in range(LAB_X0, LAB_X1):
            r, gg, b = px[x, y][:3]
            if gg - max(r, b) > 22 and gg > 85: gr += 1
            elif min(r, gg, b) > 120 and max(r, gg, b) - min(r, gg, b) < 30: g += 1
        for x in range(MID_X0, MID_X1):
            r, gg, b = px[x, y][:3]
            if min(r, gg, b) > 110 and max(r, gg, b) - min(r, gg, b) < 40: m += 1
        for x in range(NAME_X0, NAME_X1):
            r, gg, b = px[x, y][:3]
            if min(r, gg, b) > 100: l += 1
        gray[y], green[y], mid[y], left[y] = g, gr, m, l
    return gray, green, mid, left

def roster_rows(px):
    gray, green, mid, left = classify(px)
    # A load row is anchored by its green countdown. Its subtitle ("Building ·
    # 14/14 on board") sits just under it and otherwise looks exactly like a
    # roster row, so protect a band around every green hit.
    load = [False]*H
    for y in range(TOP_GUARD, H):
        if green[y] >= 3:
            for k in range(max(0, y-26), min(H, y+30)): load[k] = True
    flag = [False]*H
    for y in range(TOP_GUARD, H):
        # a name row: label on the right, nothing in the middle (that'd be the
        # conditions strip), text on the left, and not part of a load row
        if gray[y] >= 1 and mid[y] <= 8 and left[y] >= 2 and not load[y]:
            flag[y] = True
    # grow each hit so the whole glyph height and its antialiasing is covered
    out = [False]*H
    for y in range(H):
        if flag[y]:
            for k in range(max(0, y-16), min(H, y+17)): out[k] = True
    # Close short gaps. Detection fires on the dense middle of each glyph run,
    # so consecutive name rows came out as separate bands with a ~16px gap —
    # and a name whose text landed in that gap stayed sharp. Anything under a
    # row-height apart is the same block of names.
    y = 0
    while y < H:
        if out[y]:
            y2 = y
            while y2 < H and out[y2]: y2 += 1
            y3 = y2
            while y3 < H and not out[y3]: y3 += 1
            if y3 < H and y3 - y2 < 46:
                for k in range(y2, y3): out[k] = True
            y = y2
        else:
            y += 1
    return out

files = sorted(glob.glob(f"{SRC}/*.png"))
print(len(files), "frames")
# Only look while the live-loads sheet is actually up. On the home screen the
# gear cards ("RESERVE REPACK … 3 months left") match the same left-text /
# right-label shape as a roster row, so detection would blur them too.
FPS = 30
T_IN, T_OUT = 3.3, 10.5

for i, f in enumerate(files):
    im = Image.open(f).convert("RGB")
    t = i / FPS
    rows = roster_rows(im.load()) if T_IN <= t <= T_OUT else [False]*H
    if any(rows):
        blur = im.filter(ImageFilter.GaussianBlur(5))
        mask = Image.new("L", (W, H), 0)
        d = ImageDraw.Draw(mask)
        y = 0
        while y < H:
            if rows[y]:
                y2 = y
                while y2 < H and rows[y2]: y2 += 1
                d.rectangle((NAME_X0, y, NAME_X1, y2), fill=255)
                y = y2
            else:
                y += 1
        mask = mask.filter(ImageFilter.GaussianBlur(2))
        im = Image.composite(blur, im, mask)
    im.save(f"{DST}/{i:04d}.png")
    if i % 60 == 0: print("  frame", i)
print("done")
