function generate() {
    const type = document.getElementById("type").value;
    const playstyle = document.getElementById("playstyle").value;
    const pref = document.getElementById("pref").value;

    let extra = "";
    const pcSection = document.getElementById("pcSection");

    // Show/hide PC section
    pcSection.style.display = (type === "pc") ? "block" : "none";

    // Safe random generator
    function safeRand(min, max) {
        min = Math.max(0, Math.floor(min));
        max = Math.min(200, Math.floor(max));
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // PC values
    const xValues = [2.1,2.3,2.5,2.7,2.9,3.1,3.3,3.5,3.7,3.9];
    const yValues = [1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8];
    const rawConfigs = ["88088","21058","400202","80103450","948816458","800021002",
                        "80800080","102421058","808016450","148816450","158816450",
                        "838816450","807488066","807488082","7488066","58016450"];

    // Device type logic
    if (type === "iphone") {
        const styles = ["Single", "Refined", "Precise"];
        extra = "Gliding Cursor: 120 (" + styles[Math.floor(Math.random()*3)] + ")";
    } else if (type === "pc") {
        const x = xValues[Math.floor(Math.random()*xValues.length)];
        const y = yValues[Math.floor(Math.random()*yValues.length)];
        extra = "Emulator → X: " + x + " | Y: " + y;

        let configs = [];
        for (let i = 0; i < 3; i++) {
            configs.push(rawConfigs[Math.floor(Math.random()*rawConfigs.length)]);
        }

        document.getElementById("pcTweaks").innerText =
            "Configs: " + configs.join(" | ") + "\n\n" +
            "• Raw Input ON\n• No Mouse Acceleration\n• 60+ FPS Stable";
    } else {
        extra = "DPI: " + (Math.floor(Math.random()*300)+700);
    }

    // Sensitivity ranges
    let min, max;
    if (pref === "low") { min = 40; max = 112; }
    else if (pref === "mid") { min = 90; max = 160; }
    else { min = 140; max = 200; }

    // Playstyle adjustment
    if (playstyle === "freestyle") { min += 10; max += 10; }
    if (playstyle === "sniper") { min -= 10; max -= 10; }

    let general, redDot, twoX, fourX, fire;
    if (type === "pc") {
        general = safeRand(8, 15);
        redDot = safeRand(10, 18);
        twoX = safeRand(12, 20);
        fourX = safeRand(10, 18);
        fire = safeRand(40, 60);
    } else {
        general = safeRand(min, max);
        redDot = safeRand(min + 10, max);
        twoX = safeRand(min, max);
        fourX = safeRand(min - 20, max - 10);
        fire = safeRand(50, 70);
    }

    // Display results
    document.getElementById("extraResult").innerText = extra;
    document.getElementById("generalResult").innerText = "General: " + general;
    document.getElementById("redDotResult").innerText = "Red Dot: " + redDot;
    document.getElementById("twoXResult").innerText = "2X Scope: " + twoX;
    document.getElementById("fourXResult").innerText = "4X Scope: " + fourX;
    document.getElementById("fireResult").innerText = "Fire Button: " + fire;
}