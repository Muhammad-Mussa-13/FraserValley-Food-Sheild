(function () {
  var toggle = document.querySelector(".nav-toggle");
  var list = document.getElementById("nav-list");

  if (toggle && list) {
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      list.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    list.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });
  }

  var backdrop = document.getElementById("drawer-backdrop");
  var drawer = document.getElementById("proposal-drawer");
  var drawerTitle = document.getElementById("drawer-title");
  var drawerBadge = document.getElementById("drawer-badge");
  var drawerBody = document.getElementById("drawer-body");
  var drawerReturnFocus = null;

  var drawerData = {
    hubs: {
      badge: "Deliverable 1 · Waterfall",
      title: "Regional Cold-Storage Resilience Hubs",
      html:
        "<p>Five primary hubs hold a public reserve that ordinary grocery retail cannot guarantee in a wave. Each hub is commissioned with cold rooms, dry storage, backup power, potable water, and flood and seismic hardening. Satellite points in Harrison Hot Springs and the electoral areas are served from these hubs. They are not a sixth primary hub.</p>" +
        "<h3>Locations and capital lines</h3>" +
        "<table class=\"drawer-specs\"><tbody>" +
        "<tr><th scope=\"row\">Abbotsford prototype</th><td class=\"num\">CAD $112,000,000</td></tr>" +
        "<tr><th scope=\"row\">Chilliwack</th><td class=\"num\">CAD $88,000,000</td></tr>" +
        "<tr><th scope=\"row\">Mission</th><td class=\"num\">CAD $55,000,000</td></tr>" +
        "<tr><th scope=\"row\">Hope, eastern gateway</th><td class=\"num\">CAD $40,000,000</td></tr>" +
        "<tr><th scope=\"row\">Kent–Agassiz</th><td class=\"num\">CAD $45,000,000</td></tr>" +
        "<tr><th scope=\"row\">Hub subtotal</th><td class=\"num\">CAD $340,000,000</td></tr>" +
        "</tbody></table>" +
        "<h3>Specifications</h3>" +
        "<ul>" +
        "<li>Combined dry and chilled capacity for a 90-day shelf-stable reserve sized to 96,000 priority residents, which is 30 percent of the 320,000 working population, plus a rotating 14-day chilled buffer.</li>" +
        "<li>N+1 refrigeration on reserve rooms, with temperature alarms on a path that still reports when the logistics platform is down.</li>" +
        "<li>Backup generation and batteries (CAD $27,000,000), potable water and sanitation (CAD $12,000,000), and seismic and flood hardening (CAD $8,000,000). Industrial refrigeration and HVAC is a further CAD $48,000,000. Those four lines are the CAD $95,000,000 cold-chain and utilities package.</li>" +
        "<li>Hope is protected scope. A break on Highway 1 must not leave the eastern valley without stock.</li>" +
        "<li>Acceptance by June 30, 2029: occupancy, food-safety, backup-power, accessibility, and a passed temperature-mapping study.</li>" +
        "</ul>" +
        "<p>Abbotsford is inside the service geography by charter decision. It is not a member municipality of the Fraser Valley Regional District. Full acceptance criteria are on the <a href=\"scope.html#wbs\">scope page</a>.</p>" +
        "<p class=\"drawer-note\">Academic project proposal for UFV / Chaacha. All funding allocations, partnerships, and facility upgrades are hypothetical.</p>"
    },
    fleet: {
      badge: "Deliverable 2 · Distribution",
      title: "Emergency Logistics Distribution Fleet",
      html:
        "<p>The fleet exists to put parcels at designated community points in every charter municipality within 24 hours of a declared activation. The in-service target is March 31, 2029. A duty-cycle study, including a winter trial on the Hope run, decides how much of the eastern route can be electric. The contract does not assume a brochure range.</p>" +
        "<h3>Procurement lines</h3>" +
        "<table class=\"drawer-specs\"><tbody>" +
        "<tr><th scope=\"row\">Heavy refrigerated units</th><td class=\"num\">CAD $42,000,000</td></tr>" +
        "<tr><th scope=\"row\">Medium refrigerated trucks</th><td class=\"num\">CAD $28,000,000</td></tr>" +
        "<tr><th scope=\"row\">Last-mile electric vans</th><td class=\"num\">CAD $18,000,000</td></tr>" +
        "<tr><th scope=\"row\">Two depots, charging, and maintenance</th><td class=\"num\">CAD $42,000,000</td></tr>" +
        "<tr><th scope=\"row\">Telematics, parts, and tooling</th><td class=\"num\">CAD $15,000,000</td></tr>" +
        "<tr><th scope=\"row\">Fleet total</th><td class=\"num\">CAD $145,000,000</td></tr>" +
        "</tbody></table>" +
        "<h3>Route dispatch</h3>" +
        "<ul>" +
        "<li>Depots sit at Abbotsford and Chilliwack. The depot contract is separate from the vehicle contract.</li>" +
        "<li>Heavy units cover the highway runs. Medium trucks cover municipal runs that do not need a tractor. Electric vans serve community points, electoral areas, and households that cannot reach a point.</li>" +
        "<li>Unit counts are set by the duty-cycle study. They are not produced by dividing a line by a list price.</li>" +
        "<li>If the estimate moves, last-mile vans are the first fleet item to shrink. The 24-hour target and the Hope winter trial stay.</li>" +
        "<li>Telematics must be exportable by the receiving authorities. Public transit, ambulance fleets, and general municipal vehicle replacement are out of scope.</li>" +
        "</ul>" +
        "<p>Procurement rules are on the <a href=\"cost.html#procurement\">cost page</a>.</p>" +
        "<p class=\"drawer-note\">Academic project proposal for UFV / Chaacha. All funding allocations, partnerships, and facility upgrades are hypothetical.</p>"
    },
    platform: {
      badge: "Deliverable 3 · Spiral and agile",
      title: "Digital Coordination Platform",
      html:
        "<p>The platform records inventory, applies the published allocation rule, and traces recalls. It is built as a Boehm spiral with agile delivery inside each spiral, because the allocation rule and the offline procedure will change as exercises expose them. Physical hubs stay on a waterfall path. The platform is not allowed to be the only record of food temperature or stock.</p>" +
        "<h3>Architecture lines</h3>" +
        "<table class=\"drawer-specs\"><tbody>" +
        "<tr><th scope=\"row\">Platform build, five spirals</th><td class=\"num\">CAD $32,000,000</td></tr>" +
        "<tr><th scope=\"row\">Canadian-region cloud, data, and licenses through close</th><td class=\"num\">CAD $14,000,000</td></tr>" +
        "<tr><th scope=\"row\">Cybersecurity and interoperability</th><td class=\"num\">CAD $14,000,000</td></tr>" +
        "<tr><th scope=\"row\">Field hardware and backup communications</th><td class=\"num\">CAD $10,000,000</td></tr>" +
        "<tr><th scope=\"row\">Digital total</th><td class=\"num\">CAD $70,000,000</td></tr>" +
        "</tbody></table>" +
        "<h3>Tracking and resilience</h3>" +
        "<ul>" +
        "<li>Hosting stays in a Canadian region through December 31, 2029. Later years are an operating cost, outside this ceiling. Any personal information is assessed under public-sector privacy law.</li>" +
        "<li>Identity, logging, and segmentation are in scope. Stock data must be exportable. The system is not an electronic health record and not a consumer grocery site.</li>" +
        "<li>Dock and driver devices report lots and temperatures. A radio or satellite path remains when commercial networks do not. Paper and radio procedures are an accepted fallback.</li>" +
        "<li>Acceptance by September 30, 2029 includes a full exercise day with the wide-area network disconnected, a closed security test, and a closed privacy impact assessment.</li>" +
        "</ul>" +
        "<p>The lifecycle choice is explained on the <a href=\"time.html#lifecycle\">schedule page</a>.</p>" +
        "<p class=\"drawer-note\">Academic project proposal for UFV / Chaacha. All funding allocations, partnerships, and facility upgrades are hypothetical.</p>"
    },
    budget: {
      badge: "Cost baseline · Hypothetical",
      title: "CAD $1,000,000,000 Allocation Model",
      html:
        "<p>The ceiling is CAD $1,000,000,000 in constant 2027 dollars. It cannot be raised. Inflation is a risk, paid from contingency or removed from scope, unless a solicitation names an index and a cap. No unallocated balance remains.</p>" +
        "<h3>Line-item summary</h3>" +
        "<table class=\"drawer-specs\"><tbody>" +
        "<tr><th scope=\"row\">Resilience hubs</th><td class=\"num\">CAD $340,000,000</td></tr>" +
        "<tr><th scope=\"row\">Cold chain and utilities</th><td class=\"num\">CAD $95,000,000</td></tr>" +
        "<tr><th scope=\"row\">Emergency fleet and depots</th><td class=\"num\">CAD $145,000,000</td></tr>" +
        "<tr><th scope=\"row\">Digital platform and cybersecurity</th><td class=\"num\">CAD $70,000,000</td></tr>" +
        "<tr><th scope=\"row\">Strategic rations and rotation</th><td class=\"num\">CAD $175,000,000</td></tr>" +
        "<tr><th scope=\"row\">Workforce, training, and surge roster</th><td class=\"num\">CAD $40,000,000</td></tr>" +
        "<tr><th scope=\"row\">Project management and quality</th><td class=\"num\">CAD $35,000,000</td></tr>" +
        "<tr><th scope=\"row\">Partnerships, accessibility, and food sovereignty</th><td class=\"num\">CAD $20,000,000</td></tr>" +
        "<tr><th scope=\"row\">Contingency reserve</th><td class=\"num\">CAD $50,000,000</td></tr>" +
        "<tr><th scope=\"row\">Management reserve</th><td class=\"num\">CAD $30,000,000</td></tr>" +
        "<tr><th scope=\"row\">Total</th><td class=\"num\">CAD $1,000,000,000</td></tr>" +
        "</tbody></table>" +
        "<h3>How the ceiling is read</h3>" +
        "<ul>" +
        "<li>Infrastructure, the hubs plus cold chain, is CAD $435,000,000 (43.5 percent). Fleet is 14.5 percent. The platform is 7 percent. Rations are 17.5 percent. People and program are 9.5 percent. The two reserves together are 8 percent.</li>" +
        "<li>The contingency reserve is held by the project manager for identified risks. The management reserve is held by the scenario sponsor for unplanned work inside the charter.</li>" +
        "<li>The shelf-stable first fill is CAD $95,000,000 for 96,000 people over 90 days, or CAD $10.99 per person-day before specialized diets.</li>" +
        "<li>Household food replacement alone does not recover a billion dollars. The payback cases on the cost page are illustrations, not forecasts.</li>" +
        "</ul>" +
        "<p>Every line, including the descoping ladder, is on the <a href=\"cost.html\">cost page</a>.</p>" +
        "<p class=\"drawer-note\">Academic project proposal for UFV / Chaacha. All funding allocations, partnerships, and facility upgrades are hypothetical.</p>"
    }
  };

  function withoutNote(html) {
    return html.replace(/<p class="drawer-note">[\s\S]*?<\/p>\s*$/, "");
  }

  function labeledSection(key, label) {
    return "<section class=\"drawer-section\"><p class=\"drawer-kicker\">" + label + "</p>" + withoutNote(drawerData[key].html) + "</section>";
  }

  drawerData.all = {
    badge: "Full proposal brief · Hypothetical",
    title: "Hubs, fleet, platform, and the ceiling",
    html:
      labeledSection("hubs", "Deliverable 1") +
      labeledSection("fleet", "Deliverable 2") +
      labeledSection("platform", "Deliverable 3") +
      labeledSection("budget", "Allocation model") +
      "<p class=\"drawer-note\">Academic project proposal for UFV / Chaacha. All funding allocations, partnerships, and facility upgrades are hypothetical.</p>"
  };

  function drawerSwitcher(active) {
    var items = [
      ["all", "Full brief"],
      ["hubs", "Hubs"],
      ["fleet", "Fleet"],
      ["platform", "Platform"],
      ["budget", "Budget"]
    ];
    var html = "<nav class=\"drawer-switch\" aria-label=\"Proposal sections\">";
    items.forEach(function (item) {
      html += "<button type=\"button\" class=\"drawer-switch-btn" + (item[0] === active ? " is-on" : "") + "\" onclick=\"openDrawer('" + item[0] + "')\">" + item[1] + "</button>";
    });
    return html + "</nav>";
  }

  function drawerFocusable() {
    return Array.prototype.slice.call(
      drawer.querySelectorAll("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])")
    );
  }

  function openDrawer(key) {
    var data = drawerData[key];
    if (!data || !drawer || !backdrop) {
      return;
    }
    var wasOpen = drawer.classList.contains("active");
    if (!drawer.contains(document.activeElement)) {
      drawerReturnFocus = document.activeElement;
    }
    drawerBadge.textContent = data.badge;
    drawerTitle.textContent = data.title;
    drawerBody.innerHTML = drawerSwitcher(key) + data.html;
    drawerBody.scrollTop = 0;
    drawer.classList.add("active");
    backdrop.classList.add("active");
    drawer.setAttribute("aria-hidden", "false");
    drawer.inert = false;
    document.body.style.overflow = "hidden";
    if (wasOpen) {
      var current = drawer.querySelector(".drawer-switch-btn.is-on");
      if (current) {
        current.focus();
      }
    } else {
      var closeBtn = drawer.querySelector(".drawer-close");
      if (closeBtn) {
        closeBtn.focus();
      }
    }
  }

  function closeDrawer() {
    if (!drawer || !drawer.classList.contains("active")) {
      return;
    }
    drawer.classList.remove("active");
    backdrop.classList.remove("active");
    drawer.setAttribute("aria-hidden", "true");
    drawer.inert = true;
    document.body.style.overflow = "";
    if (drawerReturnFocus && typeof drawerReturnFocus.focus === "function") {
      drawerReturnFocus.focus();
    }
  }

  window.openDrawer = openDrawer;
  window.closeDrawer = closeDrawer;

  if (backdrop) {
    backdrop.addEventListener("click", closeDrawer);
  }

  document.addEventListener("keydown", function (event) {
    if (!drawer || !drawer.classList.contains("active")) {
      return;
    }
    if (event.key === "Escape") {
      closeDrawer();
      return;
    }
    if (event.key !== "Tab") {
      return;
    }
    var focusable = drawerFocusable();
    if (!focusable.length) {
      return;
    }
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".sim-tab"));
  var panel = document.getElementById("sim-panel");
  if (!tabs.length || !panel) {
    return;
  }

  var scenarios = {
    "sim-tab-1": {
      title: "Processing plant cluster outbreak",
      trigger: "A respiratory cluster closes two further-processing lines in Abbotsford. Absenteeism and a precautionary lot hold cut chilled protein into local retail within the same shift.",
      cite: "Public Health Agency of Canada, 2018",
      immediate: "The Abbotsford hub moves from standby to partial activation. The platform freezes outbound lots from the affected plants, points allocation at the shelf-stable core plus unaffected chilled stock, and calls the paid surge roster. Cooler alarms stay on the path that does not depend on the platform.",
      secondary: "Refrigerated vans run priority parcels to community points in Abbotsford, Mission, and Chilliwack. Hope’s pre-positioned stock is not drawn west. Short-dated protein from the held lots is kept out of rotation. Fraser Health’s liaison confirms the list is based on need, not on who arrives first.",
      deliverable: "Resilience hubs, led by the Abbotsford hub, with the digital logistics platform holding the lot freeze and the allocation rule.",
      metrics: [
        ["Cold-storage utilization, Abbotsford", "71%, divert to Chilliwack if it reaches 85%."],
        ["Quarantined chilled lots", "14, excluded from the countable reserve."],
        ["Emergency buffer release", "18,000 person-days in the first six hours."],
        ["Surge roster reporting", "82% of called positions filled."]
      ]
    },
    "sim-tab-2": {
      title: "Trans-border commercial freight halt",
      trigger: "Commercial freight stops at the Sumas and Pacific Highway crossings. Inbound grocery, packaging, and processing inputs queue or turn back on the same corridor that floods have already isolated.",
      cite: "Gillett et al., 2022",
      immediate: "The platform marks cross-border replenishment unavailable. Stock already at Hope and Kent–Agassiz is locked for the eastern valley so it is not pulled west. If Highway 1 is also slow, the Abbotsford depot puts the Hope run on the written alternate.",
      secondary: "The fleet runs the 24-hour community-point cycle from on-hand reserve only. Standing offers that depend on the closed crossings are not treated as supply. A mutual-aid request from Metro Vancouver is logged and declined unless the activation protocol allows it.",
      deliverable: "Emergency distribution fleet, with the digital logistics platform timing the route and protecting the east–west stock split.",
      metrics: [
        ["Route deviation, Hope run", "+46 minutes against the fair-weather baseline."],
        ["Shelf-stable cover east of Sumas", "76 days on hand."],
        ["Shelf-stable cover west of Sumas", "61 days on hand."],
        ["Border-dependent SKU fill", "22% and falling; treated as unavailable."]
      ]
    },
    "sim-tab-3": {
      title: "Urban retail panic-buying surge",
      trigger: "Retail volume in Surrey and Langley empties ordinary 72-hour household stocks before any formal declaration. Fraser Valley shelves begin to follow. Those two cities are outside the build area, so the response protects charter stock rather than opening a new hub.",
      cite: "Food and Agriculture Organization of the United Nations, 2008",
      immediate: "A leading indicator, not a declared state of emergency, opens a watch state. Within the hour the platform publishes the allocation rule: the reserve is for priority populations inside the charter geography. Community points do not become an open queue.",
      secondary: "If Fraser Valley retail can no longer reach those priority populations, hubs release a capped shelf-stable buffer to designated points only. Surrey and Langley demand is referred to their own emergency programs. No pallet moves across that boundary without a protocol that already allows mutual aid.",
      deliverable: "Digital logistics platform, enforcing the published rule, with resilience hubs releasing only the capped buffer.",
      metrics: [
        ["Emergency buffer release, 48 hours", "12,000 person-days, inside the charter area."],
        ["Parcels to named priority populations", "94% of issues."],
        ["Public notice after the indicator", "1.5 hours."],
        ["Pallets transferred to Surrey/Langley", "0."]
      ]
    }
  };

  function metricList(items) {
    return items.map(function (item) {
      return "<li><strong>" + item[0] + ":</strong> " + item[1] + "</li>";
    }).join("");
  }

  function render(id, animate) {
    var data = scenarios[id];
    if (!data) {
      return;
    }

    panel.setAttribute("aria-labelledby", id);
    panel.innerHTML =
      "<h3 class=\"sim-scenario-title\">" + data.title + "</h3>" +
      "<p class=\"sim-kicker\">Trigger event</p>" +
      "<p>" + data.trigger + " <span class=\"cite-tag\">" + data.cite + "</span></p>" +
      "<p class=\"sim-kicker\">Immediate protocol response (0–6 hours)</p>" +
      "<p>" + data.immediate + "</p>" +
      "<p class=\"sim-kicker\">Secondary stabilization actions (6–48 hours)</p>" +
      "<p>" + data.secondary + "</p>" +
      "<p class=\"sim-kicker\">Operational deliverable involved</p>" +
      "<p>" + data.deliverable + "</p>" +
      "<p class=\"sim-kicker\">Metrics monitored</p>" +
      "<ul class=\"sim-metrics\">" + metricList(data.metrics) + "</ul>";

    if (animate) {
      panel.classList.remove("is-shown");
      void panel.offsetWidth;
      panel.classList.add("is-shown");
    }
  }

  function selectTab(next, animate) {
    tabs.forEach(function (tab) {
      var on = tab.id === next.id;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });
    render(next.id, animate);
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      if (tab.getAttribute("aria-selected") === "true") {
        return;
      }
      selectTab(tab, true);
    });

    tab.addEventListener("keydown", function (event) {
      var move = 0;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        move = 1;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        move = -1;
      } else if (event.key === "Home") {
        move = -index;
      } else if (event.key === "End") {
        move = tabs.length - 1 - index;
      } else {
        return;
      }
      event.preventDefault();
      var target = tabs[(index + move + tabs.length) % tabs.length];
      target.focus();
      selectTab(target, true);
    });
  });
})();
