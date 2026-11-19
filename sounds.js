(function(){
  var audio=null;
  function context(){var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;if(!audio)audio=new C();if(audio.state==='suspended')audio.resume();return audio;}
  function tone(ctx,freq,start,duration,type,volume,endFreq){var o=ctx.createOscillator(),g=ctx.createGain();o.type=type||'sine';o.frequency.setValueAtTime(freq,start);if(endFreq)o.frequency.exponentialRampToValueAtTime(endFreq,start+duration);g.gain.setValueAtTime(0.0001,start);g.gain.exponentialRampToValueAtTime(volume,start+0.012);g.gain.exponentialRampToValueAtTime(0.0001,start+duration);o.connect(g);g.connect(ctx.destination);o.start(start);o.stop(start+duration+0.02);}
  function noise(ctx,start,duration,volume){var n=Math.floor(ctx.sampleRate*duration),b=ctx.createBuffer(1,n,ctx.sampleRate),d=b.getChannelData(0);for(var i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);var s=ctx.createBufferSource(),g=ctx.createGain(),f=ctx.createBiquadFilter();s.buffer=b;f.type='lowpass';f.frequency.value=1600;g.gain.setValueAtTime(volume,start);g.gain.exponentialRampToValueAtTime(0.0001,start+duration);s.connect(f);f.connect(g);g.connect(ctx.destination);s.start(start);}
  function play(kind){var c=context();if(!c)return;var t=c.currentTime+0.005;
    if(kind==='pop'){tone(c,620,t,.11,'sine',.10,920);tone(c,1180,t+.015,.075,'triangle',.035,760);}
    else if(kind==='swoosh'){noise(c,t,.20,.055);tone(c,260,t,.19,'sine',.045,780);tone(c,520,t+.04,.13,'triangle',.018,1040);}
    else if(kind==='soft'){tone(c,880,t,.16,'sine',.025,660);}
    else {noise(c,t,.22,.045);tone(c,440,t,.17,'sine',.065,880);tone(c,880,t+.025,.13,'triangle',.035,1320);tone(c,1320,t+.06,.12,'sine',.018,990);}
  }
  document.addEventListener('pointerover',function(e){var a=e.target.closest('a[data-sound],button[data-sound]');if(a&&!a.__hovered){a.__hovered=true;play('soft');}});
  document.addEventListener('pointerout',function(e){var a=e.target.closest('a[data-sound],button[data-sound]');if(a)a.__hovered=false;});
  document.addEventListener('click',function(e){var a=e.target.closest('a[data-sound],button[data-sound]');if(!a)return;var kind=a.getAttribute('data-sound')||'pop';play(kind);if(a.tagName==='A'&&a.getAttribute('href')&&!a.getAttribute('target')&&a.getAttribute('href').indexOf('#')!==0){var href=a.href;if(href.indexOf('javascript:')!==0){e.preventDefault();window.setTimeout(function(){window.location.href=href;},180);}}});
})();
