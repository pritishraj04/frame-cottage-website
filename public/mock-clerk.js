(function() {
  function MockClerk() {
    this.version = "6.0.0";
    this.loaded = true;
    this.user = null;
    this.session = null;
  }
  MockClerk.prototype.load = function() { return Promise.resolve(); };
  MockClerk.prototype.isReady = function() { return true; };
  MockClerk.prototype.addListener = function() { return function() {}; };
  MockClerk.prototype.mountSignIn = function() {};
  MockClerk.prototype.mountSignUp = function() {};
  MockClerk.prototype.mountUserButton = function() {};
  MockClerk.prototype.unmountSignIn = function() {};
  MockClerk.prototype.unmountSignUp = function() {};
  MockClerk.prototype.unmountUserButton = function() {};

  if (typeof window !== "undefined") {
    window.Clerk = new MockClerk();
    window.__internal_ClerkUICtor = function() {};
  }
})();
