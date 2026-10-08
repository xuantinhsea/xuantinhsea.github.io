// Tooltips, collapsible lists, light/dark theme toggle and the background network.

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

// ----- "Show More" / "Show Less" lists -----
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-collapsible-toggle]').forEach(function (button) {
        button.addEventListener('click', function () {
            var list = document.querySelector('[data-collapsible-list="' + button.getAttribute('data-collapsible-toggle') + '"]');
            if (!list) return;
            var expanded = button.getAttribute('aria-expanded') === 'true';
            list.querySelectorAll('[data-collapsible-extra]').forEach(function (item) {
                item.classList.toggle('d-none', expanded);
            });
            list.classList.toggle('is-expanded', !expanded);
            button.setAttribute('aria-expanded', String(!expanded));
            button.querySelector('[data-collapsible-more]').classList.toggle('d-none', !expanded);
            button.querySelector('[data-collapsible-less]').classList.toggle('d-none', expanded);
        });
    });
});

// ----- Theme toggle -----
(function () {
    var root = document.documentElement;
    var button = document.getElementById('site-theme-toggle');
    if (!button) return;

    var SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="currentColor"/>' +
        '<g stroke="currentColor" stroke-width="1.8" stroke-linecap="round">' +
        '<path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M18.7 5.3l-1.5 1.5M6.8 17.2l-1.5 1.5"/></g></svg>';
    var MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.5 13.4A8.5 8.5 0 1 1 10.6 3.5a6.6 6.6 0 0 0 9.9 9.9z"/></svg>';

    function isDark() {
        return root.getAttribute('data-theme') === 'dark';
    }

    function render() {
        var dark = isDark();
        button.innerHTML = dark ? MOON : SUN;
        var label = dark ? 'Switch to light mode' : 'Switch to dark mode';
        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
    }

    button.addEventListener('click', function () {
        if (isDark()) root.removeAttribute('data-theme');
        else root.setAttribute('data-theme', 'dark');
        try { localStorage.setItem('site-theme', isDark() ? 'dark' : 'light'); } catch (e) {}
        render();
    });
    render();
})();

// ----- Background: drifting points joined by thin lines that follow the mouse -----
(function () {
    var canvas = document.getElementById('bg-network');
    if (!canvas || !canvas.getContext) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var ctx = canvas.getContext('2d');
    var POINTS = 99;
    var LINK = 6000;          // squared distance for joining two points
    var MOUSE_LINK = 20000;   // squared distance for joining a point to the mouse
    var width, height, points = [];
    var mouse = { x: null, y: null };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function seed() {
        points = [];
        for (var i = 0; i < POINTS; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1
            });
        }
    }

    function line(a, b, strength) {
        ctx.beginPath();
        ctx.lineWidth = strength / 2;
        ctx.strokeStyle = 'rgba(0, 0, 0, ' + (strength + 0.2) + ')';
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
    }

    function frame() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            ctx.fillRect(p.x - 0.5, p.y - 0.5, 1, 1);

            for (var j = i + 1; j < points.length; j++) {
                var q = points[j];
                var d = (p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y);
                if (d < LINK) line(p, q, (LINK - d) / LINK);
            }

            if (mouse.x !== null) {
                var dx = p.x - mouse.x, dy = p.y - mouse.y;
                var dm = dx * dx + dy * dy;
                if (dm < MOUSE_LINK) {
                    if (dm >= MOUSE_LINK / 2) {   // gently pull points towards the cursor
                        p.x -= 0.03 * dx;
                        p.y -= 0.03 * dy;
                    }
                    line(p, mouse, (MOUSE_LINK - dm) / MOUSE_LINK);
                }
            }
        }
        if (!document.hidden) window.requestAnimationFrame(frame);
    }

    window.addEventListener('resize', function () { resize(); });
    window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseout', function () { mouse.x = null; mouse.y = null; });
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) window.requestAnimationFrame(frame);
    });

    resize();
    seed();
    window.requestAnimationFrame(frame);
})();
