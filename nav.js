// Shared site navigation: one source for every page.
(() => {
  const links = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "Quote" },
    { href: "projects.html", label: "Projects" },
    { href: "contact.html", label: "Now" },
  ];
  const file = (window.location.pathname.split("/").pop() || "index.html");
  const current = file === "" ? "index.html" : file;
  document.querySelectorAll(".site-nav .nav-list").forEach((list) => {
    list.innerHTML = links.map(({ href, label }) => {
      const active = href === current ? ' aria-current="page"' : "";
      return `<li><a href="${href}"${active}>${label}</a></li>`;
    }).join("");
  });
})();
