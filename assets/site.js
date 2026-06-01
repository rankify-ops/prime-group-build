// Prime Group Build shared JS
(function(){
  var nav = document.getElementById('nav');
  var sticky = document.querySelector('.sticky');
  var hero = document.querySelector('.hero, .phero, .pdhero');
  if(nav || sticky){
    var setState = function(){
      var y = window.scrollY;
      if(nav) nav.classList.toggle('scrolled', y > 50);
      if(sticky){
        var threshold = hero ? hero.offsetTop + hero.offsetHeight - 120 : window.innerHeight * 0.7;
        sticky.classList.toggle('show', y > threshold);
      }
    };
    setState();
    window.addEventListener('scroll', setState, { passive:true });
    window.addEventListener('resize', setState, { passive:true });
  }

  // Mobile drawer
  var tog = document.querySelector('.mob-tog');
  var drawer = document.querySelector('.mdrawer');
  if(tog && drawer){
    var closeDrawer = function(){
      tog.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    };
    var openDrawer = function(){
      tog.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    tog.addEventListener('click', function(){
      if(drawer.classList.contains('open')) closeDrawer(); else openDrawer();
    });
    document.addEventListener('keydown', function(ev){
      if(ev.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });
    drawer.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', closeDrawer);
    });

    // Collapsible drawer groups
    drawer.querySelectorAll('.mdrawer-group-title').forEach(function(t){
      t.addEventListener('click', function(){
        t.classList.toggle('open');
        var items = t.nextElementSibling;
        if(items && items.classList.contains('mdrawer-group-items')){
          items.style.maxHeight = t.classList.contains('open') ? items.scrollHeight + 'px' : '0';
        }
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Intersection Observer for fade-in animations
  if('IntersectionObserver' in window){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.fade-up').forEach(function(el){ obs.observe(el); });
  }
})();
