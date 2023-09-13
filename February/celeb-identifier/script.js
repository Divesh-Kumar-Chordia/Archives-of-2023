function recognize() {
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = 'https://vision.googleapis.com/v1/images:annotate?key=' + apiKey;
    const photo = document.getElementById('photo').files[0];
    const name = document.getElementById('name').value;
    
    if (!photo) {
      alert('Please select a photo.');
      return;
    }
    
    if (!name) {
      alert('Please enter your name.');
      return;
    }
    
    const formData = new FormData();
    formData.append('photo', photo);
    
    const request = new XMLHttpRequest();
    request.open('POST', apiUrl);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        const response = JSON.parse(this.responseText);
        const annotations = response.responses[0].faceAnnotations;
        if (annotations && annotations.length > 0) {
          const celebrityAnnotations = annotations.filter(a => a.recognitionResult && a.recognitionResult.celerityRecognition && a.recognitionResult.celebrityRecognition.length > 0);
          if (celebrityAnnotations.length > 0) {
            const celebrity = celebrityAnnotations[0].recognitionResult.celebrityRecognition[0].celebrity;
            const confidence = celebrityAnnotations[0].recognitionResult.celebrityRecognition[0].confidence;
            const message = `Hi ${name}, you look like ${celebrity} with a confidence of ${confidence.toFixed(2)}%.`;
            document.getElementById('result').innerHTML = message;
          } else {
            document.getElementById('result').innerHTML = `Sorry, we could not recognize any celebrity in your photo.`;
          }
        } else {
          document.getElementById('result').innerHTML = `Sorry, we could not recognize any faces in your photo.`;
        }
      } else if (this.readyState === XMLHttpRequest.DONE) {
        alert('An error occurred.');
      }
    };
    
    const requestData = {
      'requests': [
        {
          'image': {
            'content': ''
          },
          'features': [
            {
              'type': 'FACE_DETECTION',
              'maxResults': 10
            }
          ]
        }
      ]
    };
    
    const reader = new FileReader();
    reader.onload = function() {
      const base64 = reader.result.split(',')[1];
      requestData.requests[0].image.content = base64;
      request.send(JSON.stringify(requestData));
    };
    reader.readAsDataURL(photo);
  }
  