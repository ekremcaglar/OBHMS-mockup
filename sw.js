
self.addEventListener('sync', function(event) {
  if (event.tag == 'sync-feedback') {
    event.waitUntil(syncFeedback());
  }
});

function syncFeedback() {
  return new Promise(function(resolve, reject) {
    const dbRequest = indexedDB.open('feedback-db', 1);

    dbRequest.onerror = function(event) {
      console.error('Error opening IndexedDB:', event.target.error);
      reject();
    };

    dbRequest.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(['feedback'], 'readonly');
      const objectStore = transaction.objectStore('feedback');
      const getRequest = objectStore.getAll();

      getRequest.onsuccess = function(event) {
        const feedbacks = event.target.result;
        if (feedbacks.length === 0) {
          resolve();
          return;
        }

        fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(feedbacks),
        })
        .then(response => {
          if (response.ok) {
            const deleteTransaction = db.transaction(['feedback'], 'readwrite');
            const deleteObjectStore = deleteTransaction.objectStore('feedback');
            deleteObjectStore.clear();
            console.log('Feedback synced successfully');
            resolve();
          } else {
            console.error('Failed to sync feedback');
            reject();
          }
        })
        .catch(error => {
          console.error('Error syncing feedback:', error);
          reject();
        });
      };

      getRequest.onerror = function(event) {
        console.error('Error getting feedback from IndexedDB:', event.target.error);
        reject();
      };
    };
  });
}
