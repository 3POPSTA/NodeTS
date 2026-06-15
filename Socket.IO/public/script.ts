// Client-side script loaded in browser
declare const io: () => {
  emit: (event: string, data: any) => void;
  on: (event: string, callback: (data: any) => void) => void;
};

const socket = io();
const form = document.getElementById('form') as HTMLFormElement | null;
const input = document.getElementById('input') as HTMLInputElement | null;
const messages = document.getElementById('messages') as HTMLElement | null;

if (form && input && messages) {
  // Handle form submission
  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const message = input.value.trim();
    if (message) {
      // Emit the message to the server
      socket.emit('chat message', message);
      // Clear the input
      input.value = '';
    }
  });

  // Listen for incoming messages
  socket.on('chat message', (msg: string) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    // Scroll to the bottom
    messages.scrollTop = messages.scrollHeight;
  });
}

export {};
