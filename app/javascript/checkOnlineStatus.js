const checkOnlineStatus = async () => {
    try {
      const online = await fetch("/assets/images/1pixel.png");
      return online.status >= 200 && online.status < 300; // either true or false
    } catch (err) {
      return false; // definitely offline
    }
  };
  
  setInterval(async () => {
    const result = await checkOnlineStatus();
    const statusDisplay = document.getElementById("status");
    statusDisplay.textContent = result ? "Online" : "OFFline";
    localStorage.setItem('onlineStatus', result ? "Online" : "OFFline");
  }, 3000); // probably too often, try 30000 for every 30 seconds
  