(function () {
  const container = document.getElementById("royride-transfer-widget");

  container.innerHTML = `
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Aller&display=swap" rel="stylesheet">

    <style>
      #royride-transfer-widget .rr-glass-widget {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(12px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        max-width: 320px;
        font-family: 'Cabin', sans-serif;
      }

      #royride-transfer-widget .rr-glass-box {
        padding: 16px 20px;
        background: rgba(255, 255, 255, 0.1);
        cursor: pointer;
        color: #fff;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 6px;
        border-radius: 8px;
        border: 1px solid rgba(180, 180, 180, 0.5);
        transition: all 0.3s ease;
      }

      #royride-transfer-widget .rr-glass-box:hover {
        background: rgba(255, 255, 255, 0.25);
        transform: scale(1.02);
        box-shadow: 0 4px 16px rgba(255, 255, 255, 0.15);
      }

      .rr-panel-container {
        background: #fff;
        padding: 40px 24px 24px 24px;
        border-radius: 16px;
        position: relative;
      }

      .rr-close-top {
        position: absolute;
        top: 12px;
        right: 16px;
        background: transparent;
        color: #000;
        font-size: 20px;
        border: none;
        cursor: pointer;
      }

      .rr-title {
        font-family: 'Aller', sans-serif;
        font-size: 20px;
        color: #000;
        margin-top: 0;
        margin-bottom: 20px;
      }

      .rr-tab-switch {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 16px;
      }

      .rr-tab-switch button {
        flex: 1;
        padding: 12px;
        border-radius: 6px;
        border: 1px solid #ccc;
        background: #f5f5f5;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .rr-tab-switch button.active {
        border-color: #38b5fd;
        background: #eaf6ff;
        color: #000;
      }

      .rr-subpanel {
        background: #f5f5f5;
        padding: 16px;
        border-radius: 6px;
      }

      .rr-subtitle {
        font-size: 16px;
        color: #444;
        margin-bottom: 20px;
        font-weight: 600;
      }

      .rr-form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
      }

      .rr-form-group label {
        font-size: 14px;
        color: #333;
        margin-bottom: 6px;
      }

      .rr-form-group input {
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #ccc;
        font-size: 14px;
        width: 100%;
        box-sizing: border-box;
        transition: border-color 0.3s;
      }

      .rr-form-group input:focus {
        border-color: #38b5fd;
        outline: none;
        box-shadow: 0 0 0 3px rgba(56, 181, 253, 0.15);
      }

      .rr-next-btn, .rr-back-btn {
        margin-top: 30px;
        padding: 12px;
        width: 100%;
        background: #38b5fd;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .rr-next-btn:hover, .rr-back-btn:hover {
        background: #1a99e0;
      }

      #rr-datetime-popup {
        position: fixed;
        top: 10vh;
        right: 20px;
        width: 320px;
        max-width: 90vw;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 12px 28px rgba(0,0,0,0.2);
        z-index: 99999;
        padding: 20px;
        display: none;
        font-family: 'Inter', sans-serif;
      }

      #rr-datetime-popup h4 {
        font-size: 16px;
        margin-bottom: 10px;
        font-weight: 600;
        color: #000;
      }
    </style>

    <div class="rr-glass-widget">
      <div class="rr-glass-box" id="rr-open-panel">
        <span>Schedule a transfer</span>
        <span class="rr-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>
    </div>

    <!-- Panel 1 -->
    <div id="rr-widget-panel" style="display:none; position:fixed; top:5vh; bottom:5vh; right:0; width:360px; max-width:95vw; background:#fff; box-shadow:-4px 0 12px rgba(0,0,0,0.2); border-radius:16px 0 0 16px; padding:0; z-index:9999; overflow-y:auto;">
      <div class="rr-panel-container">
        <button class="rr-close-top" id="rr-close-panel">×</button>
        <h3 class="rr-title">Transfer booking</h3>

        <div class="rr-tab-switch">
          <button class="active" id="rr-tab-passenger">Passenger details</button>
          <button id="rr-tab-vehicle">Vehicle details</button>
        </div>

        <!-- Passenger Details -->
        <div id="rr-pane-passenger" class="rr-subpanel">
          <div class="rr-form-group">
            <label for="rr-name">First and last names</label>
            <input type="text" id="rr-name" placeholder="e.g. John Doe" />
          </div>

          <div class="rr-form-group">
            <label for="rr-phone">Contact number</label>
            <input type="tel" id="rr-phone" placeholder="e.g. +254 712 345678" />
          </div>

          <div class="rr-form-group">
            <label for="rr-from">From</label>
            <input type="text" id="rr-from" placeholder="NBO Nairobi" autocomplete="off" />
          </div>

          <div class="rr-form-group">
            <label for="rr-to">To</label>
            <input type="text" id="rr-to" placeholder="e.g. JKIA Airport" autocomplete="off" />
          </div>

          <div class="rr-form-group">
            <label for="rr-passengers">Passengers</label>
            <input type="number" id="rr-passengers" min="1" value="1" />
          </div>

          <button class="rr-next-btn" id="rr-next-to-vehicle">Next</button>
        </div>

        <!-- Vehicle Details -->
        <div id="rr-pane-vehicle" class="rr-subpanel" style="display:none;">
          <p class="rr-subtitle">Select Vehicle</p>
          <label><input type="radio" name="rr-vehicle" value="Sedan" /> Sedan</label><br/>
          <label><input type="radio" name="rr-vehicle" value="SUV" /> SUV</label><br/>
          <label><input type="radio" name="rr-vehicle" value="Van" /> Van</label>

          <button class="rr-next-btn" id="rr-submit-booking">Submit Booking</button>
        </div>
      </div>
    </div>

    <!-- Panel 2 (Feedback) -->
    <div id="rr-widget-panel-next" style="display:none; position:fixed; top:5vh; bottom:5vh; right:0; width:360px; max-width:95vw; background:#fff; box-shadow:-4px 0 12px rgba(0,0,0,0.2); border-radius:16px 0 0 16px; padding:0; z-index:9999; overflow-y:auto;">
      <div class="rr-panel-container">
        <button class="rr-close-top" id="rr-close-panel-next">×</button>
        <h3 class="rr-title">Booking Status</h3>
        <p id="rr-status-text" style="color:#444">This is where the next content will go.</p>
        <button class="rr-back-btn" id="rr-back-to-main">Back</button>
      </div>
    </div>
  `;

  // Logic
  const panel = document.getElementById("rr-widget-panel");
  const panelNext = document.getElementById("rr-widget-panel-next");

  document.getElementById("rr-open-panel").addEventListener("click", () => panel.style.display = "block");
  document.getElementById("rr-close-panel").addEventListener("click", () => panel.style.display = "none");
  document.getElementById("rr-close-panel-next").addEventListener("click", () => panelNext.style.display = "none");
  document.getElementById("rr-back-to-main").addEventListener("click", () => {panel.style.display = "block"; panelNext.style.display = "none";});

  // Tabs
  const tabPassenger = document.getElementById("rr-tab-passenger");
  const tabVehicle = document.getElementById("rr-tab-vehicle");
  const panePassenger = document.getElementById("rr-pane-passenger");
  const paneVehicle = document.getElementById("rr-pane-vehicle");

  tabPassenger.addEventListener("click", () => {
    panePassenger.style.display = "block";
    paneVehicle.style.display = "none";
    tabPassenger.classList.add("active");
    tabVehicle.classList.remove("active");
  });

  tabVehicle.addEventListener("click", () => {
    panePassenger.style.display = "none";
    paneVehicle.style.display = "block";
    tabVehicle.classList.add("active");
    tabPassenger.classList.remove("active");
  });

  document.getElementById("rr-next-to-vehicle").addEventListener("click", () => {
    tabVehicle.click();
  });

  // Booking submission
  function collectFormData() {
    return {
      name: document.getElementById("rr-name").value.trim(),
      phone: document.getElementById("rr-phone").value.trim(),
      from: document.getElementById("rr-from").value.trim(),
      to: document.getElementById("rr-to").value.trim(),
      passengers: document.getElementById("rr-passengers").value,
      vehicle: document.querySelector('input[name="rr-vehicle"]:checked')?.value || ""
    };
  }

  function validateForm(data) {
    if (!data.name) return "Please enter your name.";
    if (!data.phone.match(/^\+?\d{7,15}$/)) return "Please enter a valid phone number.";
    if (!data.from) return "Pickup location is required.";
    if (!data.to) return "Destination is required.";
    if (!data.passengers || isNaN(data.passengers) || data.passengers < 1) return "Enter passenger count.";
    if (!data.vehicle) return "Please select a vehicle.";
    return null;
  }

  document.getElementById("rr-submit-booking").addEventListener("click", async () => {
    const data = collectFormData();
    const error = validateForm(data);
    if (error) { alert(error); return; }

    panel.style.display = "none";
    panelNext.style.display = "block";
    const statusText = document.getElementById("rr-status-text");
    statusText.textContent = "Submitting your booking...";

    try {
      const response = await fetch("https://your-backend-api.com/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Network error");
      const result = await response.json();

      statusText.textContent = "✅ Booking successful! Reference: " + (result.reference || "N/A");
    } catch (err) {
      console.error(err);
      statusText.textContent = "❌ Booking failed. Please try again.";
    }
  });
})();
