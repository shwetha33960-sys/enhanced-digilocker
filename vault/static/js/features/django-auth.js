/* Connects the Sign in, Create account, Admin sign in and Sign out
   behaviour to Django. Loaded last, so it replaces the old demo versions. */
(function () {
  function getCookie(name) {
    const m = document.cookie.match('(?:^|; )' + name + '=([^;]*)');
    return m ? decodeURIComponent(m[1]) : '';
  }

  async function api(url, body) {
    try {
      const r = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken') },
        body: JSON.stringify(body || {})
      });
      const data = await r.json().catch(() => ({}));
      return { ok: r.ok, data };
    } catch (e) {
      return { ok: false, data: { error: 'Cannot reach the server. Is Django running?' } };
    }
  }

  // TEMPORARY: copies the Django user into browser storage so the other pages still work.
  function bridge(u) {
    const id = 'dj' + u.id;
    const U = DV.users().filter(x => x.id !== id);
    U.push({
      id, name: u.name, email: u.email, phone: u.phone, city: u.city,
      status: u.status, joined: DV.now().slice(0, 10), settings: u.settings
    });
    DV.set('users', U);
    return id;
  }

  function finish(d) {
    if (d.role === 'admin') {
      DV.login('admin', 'admin');
      DV.log(d.email, 'Admin signed in', 'Signed in with Django', 'admin');
      location.href = 'admin-dashboard.html';
    } else {
      const id = bridge(d);
      DV.login('user', id);
      DV.log(d.email, 'Signed in', 'Signed in with Django', 'auth');
      location.href = 'dashboard.html';
    }
  }

  /* ---------- Sign in ---------- */
  pages.login = function () {
    main().innerHTML = `<div class="lg"><div class="lgcard"><h1>Sign In to your account!</h1>
      <form id="f" novalidate>
        <input id="email" type="email" placeholder="Email address*" aria-label="Email address" aria-describedby="email-e" autocomplete="username">
        <p class="err" id="email-e" role="alert"></p>
        <input id="pw" type="password" placeholder="Password*" aria-label="Password" aria-describedby="pw-e" autocomplete="current-password">
        <p class="err" id="pw-e" role="alert"></p>
        <button class="lgnext">Sign In</button>
      </form></div>
      <p class="lgsign">Do not have an account? <a href="register.html">Sign Up</a></p>
      <p class="lgnote"><a href="admin-login.html">Administrator sign in</a></p></div>`;
    $('#email').focus();
    $('#f').onsubmit = async e => {
      e.preventDefault();
      const em = $('#email').value.trim().toLowerCase(), pw = $('#pw').value;
      if ([bad('email', !emailOk(em) && 'Enter a valid email address.'),
           bad('pw', pw.length < 8 && 'Password must have at least 8 characters.')].some(Boolean)) return;
      const res = await api('/api/auth/login/', { email: em, password: pw });
      if (!res.ok) { bad('pw', res.data.error || 'Sign in failed.'); return; }
      finish(res.data);
    };
  };

  /* ---------- Create account ---------- */
  pages.register = function () {
    main().innerHTML = `<div class="narrow card"><h1>Create an account</h1>
      <form id="f" novalidate>
        ${fld('name', 'Full name', 'text', 'maxlength="60" autocomplete="name"')}
        ${fld('email', 'Email address', 'email')}
        ${fld('pw', 'Password (8+ characters, letters and a number)', 'password', 'autocomplete="new-password"')}
        ${fld('pw2', 'Confirm password', 'password', 'autocomplete="new-password"')}
        <div class="fld"><label class="chk"><input type="checkbox" id="agree" aria-describedby="agree-e">I understand this is a student project and I will use fictional data only.</label><p class="err" id="agree-e" role="alert"></p></div>
        <button class="btn">Create account</button>
      </form><p>Already registered? <a href="login.html">Sign in</a></p></div>`;
    $('#f').onsubmit = async e => {
      e.preventDefault();
      const n = $('#name').value.trim(), em = $('#email').value.trim().toLowerCase(), pw = $('#pw').value;
      if ([bad('name', n.length < 3 && 'Enter your full name (at least 3 characters).'),
           bad('email', !emailOk(em) && 'Enter a valid email address.'),
           bad('pw', !(pw.length >= 8 && /[a-z]/i.test(pw) && /\d/.test(pw)) && 'Use at least 8 characters with letters and a number.'),
           bad('pw2', pw !== $('#pw2').value && 'Passwords do not match.'),
           bad('agree', !$('#agree').checked && 'Please tick the box to continue.')].some(Boolean)) return;
      const res = await api('/api/auth/register/', { name: n, email: em, password: pw });
      if (!res.ok) { bad('email', res.data.error || 'Could not create the account.'); return; }
      DV.note('dj' + res.data.id, 'Welcome to Digital Vault Demo. Upload a dummy file to get started.');
      finish(res.data);
    };
  };

  /* ---------- Administrator sign in ---------- */
  pages.adminLogin = function () {
    main().innerHTML = `<div class="narrow card"><h1>Administrator sign in</h1>
      <form id="f" novalidate>
        ${fld('email', 'Admin email', 'email')}
        ${fld('pw', 'Password', 'password')}
        <button class="btn">Sign in as administrator</button>
      </form><p><a href="login.html">Back to user sign in</a></p></div>`;
    $('#f').onsubmit = async e => {
      e.preventDefault();
      const em = $('#email').value.trim().toLowerCase(), pw = $('#pw').value;
      if ([bad('email', !emailOk(em) && 'Enter a valid email address.'),
           bad('pw', !pw && 'Enter your password.')].some(Boolean)) return;
      const res = await api('/api/auth/login/', { email: em, password: pw });
      if (!res.ok) { bad('pw', res.data.error || 'Sign in failed.'); return; }
      if (res.data.role !== 'admin') {
        await api('/api/auth/logout/');
        bad('email', 'This account is not an administrator.');
        return;
      }
      finish(res.data);
    };
  };

  /* ---------- Sign out ---------- */
  const oldLogout = DV.logout.bind(DV);
  DV.logout = function () {
    oldLogout();
    fetch('/api/auth/logout/', {
      method: 'POST', credentials: 'same-origin', keepalive: true,
      headers: { 'X-CSRFToken': getCookie('csrftoken') }
    }).catch(() => {});
  };
})();