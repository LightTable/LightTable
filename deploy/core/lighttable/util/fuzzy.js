String.prototype.score=function(a,b){if(this==a)return 1;if(a=="")return 0;var c=0,d=a.length,e=this,f=e.length,g,h,i=1,j;for(var k=0,l,m,n,o,p,q;k<d;++k){n=a.charAt(k),o=e.indexOf(n.toLowerCase()),p=e.indexOf(n.toUpperCase()),q=Math.min(o,p),m=q>-1?q:Math.max(o,p);if(m===-1){if(b){i+=1-b;continue}return 0}l=.1,e[m]===n&&(l+=.1),m===0?(l+=.6,k===0&&(g=1)):e.charAt(m-1)===" "&&(l+=.8),e=e.substring(m+1,f),c+=l}h=c/d,j=(h*(d/f)+h)/2,j=j/i,g&&j+.15<1&&(j+=.15);return j};

function wrapMatch(str, info) {
  var run = "", final = "";
  var matched = info.matched;
  var len = str.length;
  for(var i = 0; i < len; i++) {
    while(matched[i]) {
      run += str[i];
      i++;
    }
    if(run) {
      final += "<em>" + run + "</em>";
      run = "";
    }
    if(i < len) {
      final += str[i];
    }
  }
  return final;
}

function clone(match) {
  var target = {matched: {}, score: match.score};
  for (var i in match.matched) {
    target.matched[i] = match.matched[i];
  }
  return target;
}

var separators = /[\/\\\.\n\r\|\:\;\,\ ]/;

function findall(str, match, idx, cur, limit, orig) {
  if(!orig) {
    orig = str;
  }
  var first = match[0];
  var remaining = match.substring(0 + 1);

  idx = str.indexOf(first, idx);
  if(idx < 0) return [{score:0, matched:{}}];

  var all = [];
  while(idx >= 0 && limit > 0) {
    var neue = clone(cur);
    neue.matched[idx] = true;
    if(neue.matched[idx-1]) {
      neue.score += 3;
      if(orig[idx-1].match(separators)) {
        neue.score += 2;
      }
    } else if (idx === 0) {
      neue.score += 3;
    } else if(orig[idx-1].match(separators)) {
      neue.score += 2;
    } else {
      neue.score += 1;
    }
    if(remaining) {
      var rest = findall(str, remaining, idx+1, neue, limit, orig);
      if(rest.length) {
        for(var i in rest) {
          all.push(rest[i]);
        }
      } else {
        all.push(rest);
      }
    } else {
      all.push(neue);
    }
    idx = str.indexOf(first, idx + 1);
    limit--;
  }

  return all;
}

function scoreSort(x, y) {
  return y.score - x.score;
}

function score(str, match) {
  var found = str.indexOf(match);
  if(found >= 0) {
    var curScore = match.length * 3;
    if(found === 0 || str[found-1].match(separators)) {
      curScore += 2;
    }
    var matched = {};
    for(var i = 0; i < match.length; i++) {
      matched[i + found] = true;
    }
    return {score: curScore, matched: matched};
  }
  return findall(str.toLowerCase(), match.toLowerCase(), 0, {score:0, matched: {}}, 10).sort(scoreSort)[0];
}

function fastScore(str, match) {
  var i = 0;
  var idx = -1;
  str = str.toLowerCase();
  match = match.toLowerCase();
  while(i < match.length) {
    if((idx = str.indexOf(match[i], idx + 1)) < 0) {
      return false;
    }
    i++;
  }
  return true;
}
