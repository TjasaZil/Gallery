/** ajax calls to fetch data from the server */

document.addEventListener('DOMContentLoaded', function(){
  fetch('http://localhost:3000/api/images')
  .then(response=>{
    console.log(response); // Add this line to log the response
    return response.json();})
  .then(ids=>{
    ids.forEach(id=>loadImageDetails(id))
    .catch(error => console.error('Fetch error:', error));
  });

  function loadImageDetails(id){
 fetch(`http://localhost:3000/api/image/${id}`)
 .then(response=>response.json())
 .then(data=>{
  displayImage(data)
 })
 .catch(error => console.error('Fetch error:', error));
  }

  /** function for displaying the image */
  function displayImage(data) {
    const container = document.createElement('div');
    container.className = 'image-container';
    container.innerHTML = `
      <img src="${data.imageSrc}" alt="${data.title}">
      <div class="overlay" style="background-color: ${data.overlayColor}">${data.title}</div>
    `;
    document.getElementById('image_gallery').appendChild(container);
  }
})