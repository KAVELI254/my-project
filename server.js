// public/app.js
document.addEventListener('DOMContentLoaded', () => {
    const resourcesList = document.getElementById('resourcesList');
    const feedbackList = document.getElementById('feedbackList');
    const submitFeedbackButton = document.getElementById('submitFeedback');
    const nameInput = document.getElementById('name');
    const feedbackText = document.getElementById('feedbackText');
  
    // Fetch resources from the server
    async function loadResources() {
      const response = await fetch('/resources');
      const resources = await response.json();
      resourcesList.innerHTML = '';
      resources.forEach(resource => {
        const resourceItem = document.createElement('li');
        resourceItem.innerHTML = `
          <h3>${resource.title}</h3>
          <p>${resource.description}</p>
          <a href="${resource.videoUrl}" target="_blank">Watch Video</a>
        `;
        resourcesList.appendChild(resourceItem);
      });
    }
  
    // Load feedback from the server
    async function loadFeedback() {
      const response = await fetch('/feedback');
      const feedbacks = await response.json();
      feedbackList.innerHTML = '';
      feedbacks.forEach(feedback => {
        const feedbackItem = document.createElement('li');
        feedbackItem.innerHTML = `
          <strong>${feedback.name}</strong>: ${feedback.feedback}
          <span>(${new Date(feedback.date).toLocaleString()})</span>
        `;
        feedbackList.appendChild(feedbackItem);
      });
    }
  
    // Submit feedback
    submitFeedbackButton.addEventListener('click', async () => {
      const name = nameInput.value.trim();
      const feedback = feedbackText.value.trim();
  
      if (name && feedback) {
        await fetch('/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, feedback }),
        });
  
        nameInput.value = '';
        feedbackText.value = '';
        loadFeedback();  // Reload feedback list
      } else {
        alert('Please fill in both fields.');
      }
    });
  
    loadResources();
    loadFeedback();
  });
  