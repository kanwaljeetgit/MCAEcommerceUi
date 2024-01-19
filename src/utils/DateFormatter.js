const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use 12-hour clock
};

function defaultDateFormatter(date){
   return new Date(date).toLocaleString('en-US', options);
}

export {defaultDateFormatter};