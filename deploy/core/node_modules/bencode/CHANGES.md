## 0.4.3
 * improved performance a lot
 * dropped support for de- and encoding floats to respect the spec

   *note:* node-bencode will still decodes stuff like "i42.23e" but will cast the
   result to an interger

## 0.4.2
 * bugfix: sort dictionary keys to follow the spec

## 0.4.1
 * bugfix: number decoding was kinda broken

## 0.4.0
 * fixed problems with multibyte strings
 * some performance improvements
 * improved code quality

## 0.3.0
 * #decode() accepts a encoding as its second paramtere

## 0.2.0
 * complete rewrite, @jhermsmeier joins the team

## 0.1.0
 * added encoding

## 0.0.1
First version, decoding only
