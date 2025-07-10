<script lang="ts">
  // Form submission handler (basic validation for now)
  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (form.checkValidity()) {
      alert('Message sent successfully!');
    } else {
      alert('Please fill all fields with valid data.');
    }
  }
</script>

<!-- Message Form Section -->
<div class="bg-black text-white p-6 rounded-xl shadow-md max-w-lg mx-auto w-full border border-gray-800">
  <h2 class="text-2xl font-bold mb-6">Send a Message</h2>
  
  <form on:submit={handleSubmit} class="space-y-6">
    <!-- Name Input -->
    <div>
      <input
        type="text"
        placeholder="Your Name"
        class="w-full p-2 bg-transparent border-b-2 border-gray-500 focus:border-[#cba157] focus:outline-none text-lg transition-colors duration-300 required"
        required
      />
    </div>
    
    <!-- Email Input -->
    <div>
      <input
        type="email"
        placeholder="Your Email"
        class="w-full p-2 bg-transparent border-b-2 border-gray-500 focus:border-[#cba157] focus:outline-none text-lg transition-colors duration-300 required"
        required
      />
    </div>
    
    <!-- Message Input -->
    <div>
      <textarea
        placeholder="Your Message"
        class="w-full p-2 bg-transparent border-b-2 border-gray-500 focus:border-[#cba157] focus:outline-none h-24 text-lg transition-colors duration-300 required"
        required
      ></textarea>
    </div>
    
    <!-- Send Button -->
    <button
      type="submit"
      class="w-full bg-[#cba157] text-black cursor-pointer font-semibold py-3 rounded-lg hover:bg-black hover:text-[#cba157] transition-colors duration-300 text-lg"
    >
      Send
    </button>
  </form>
</div>
