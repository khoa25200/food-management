export function dkLogger(action, label = '', data = null, result = null) {
  const styles = {
      api: 'color: purple; font-weight: bold;',
      success: 'color: green; font-weight: bold;',
      error: 'color: red; font-weight: bold;',
      data: 'color: blue; font-weight: bold;',
  };

  const logMessage = (message, style, additionalData) => {
      console.log(`%c${message}`, style);
      if (additionalData) {
          console.log(additionalData);
      }
  };

  switch (action) {
      case 'api':
          logMessage(`==== Request ====[API Call] ${label}`, data, styles.api);
          break;
      case 'success':
          logMessage(`=== Response === [Success] ${label}`, styles.success, result);
          break;
      case 'error':
          console.log('========= Response =========');
          logMessage(`[Error] ${label}`, styles.error, result);
          break;
      case 'data':
          logMessage(`=== Response === [Data] ${label}`, styles.data, data);
          break;
      default:
          console.log(label, data, result);
          break;
  }
}