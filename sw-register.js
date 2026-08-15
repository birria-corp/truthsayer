if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/truthsayer/sw.js')
      .catch(err => console.log('SW registration failed:', err));
  });
}
