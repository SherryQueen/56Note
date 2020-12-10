#### 生成水印

```bash
# 生成一张只有水印，且背景含透明度的水印图片。 与目标图片混合得到水印图片
magick -size 700x1024  xc:none  -fill 'rgba(0,0,0,1)' -font './SongTi.ttc' -pointsize 50  -gravity center  -draw 'rotate -45 text 0,0 \"仅供2020/09/04-2020/09/05住宿使用\"' -resize 60%  miff:- |  composite  -tile -dissolve 25 -  id.jpg id_with_watermark.jpg
```
