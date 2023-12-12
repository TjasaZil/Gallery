document.addEventListener("DOMContentLoaded", function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/api/images", true);

  xhr.onload = function () {
    if (this.status >= 200 && this.status < 300) {
      var ids;
      try {
        ids = JSON.parse(this.responseText);
      } catch (e) {
        console.error("Error parsing JSON:", e);
        return;
      }
      ids.forEach((id) => loadImageDetails(id));
    } else {
      console.error("Request failed with status:", this.status);
    }
  };

  xhr.onerror = function () {
    console.error("Request failed");
  };

  xhr.send();

  function loadImageDetails(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/api/image/${id}`, true);

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        var data;
        try {
          data = JSON.parse(this.responseText);
        } catch (e) {
          console.error("Error parsing JSON:", e);
          return;
        }
        displayImage(data);
      } else {
        console.error("Request failed with status:", this.status);
      }
    };

    xhr.onerror = function () {
      console.error("Request failed");
    };

    xhr.send();
  }
  function displayImage(data) {
    const container = document.createElement("div");
    container.className = "image-container";
    container.innerHTML = `
      <img src="${data.imageSrc}" alt="${data.title}">
      <div class="caption">${data.title}</div>
      <div class="overlay" style="background-color: ${data.overlayColor};"></div>
    `;
    document.getElementById("image_gallery").appendChild(container);
  }
});
