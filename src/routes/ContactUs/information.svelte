     <script lang="ts">
       import  Icon  from '@iconify/svelte';
       import Message from './message.svelte';
     </script>

     <!-- Contact Information Section -->
     <section class="py-16 px-4 sm:px-6 lg:px-8 rounded-lg" style="background-color: #ffffff;">
       <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
         <!-- Contact Details -->
         <div>
           <h2 class="text-2xl font-bold text-gray-900 mb-4">Get in touch</h2>
           <p class="text-gray-600 mb-6">Feel free to reach out to us anytime!</p>
           
           <!-- Location -->
           <div class="flex items-center mb-4">
             <span class="w-10 h-10 flex items-center justify-center rounded-full bg-[#cba157] text-white mr-4">
               <Icon icon="mdi:map-marker" width="20" />
             </span>
             <div>
               <p class="font-bold">Address</p>
               <p class="text-gray-700">123 Art Street, Creative City, CC 45678</p>
             </div>
           </div>
           
           <!-- Phone -->
           <div class="flex items-center mb-4">
             <span class="w-10 h-10 flex items-center justify-center rounded-full bg-[#cba157] text-white mr-4">
               <Icon icon="mdi:phone" width="20" />
             </span>
             <div>
               <p class="font-bold">Phone number</p>
               <p class="text-gray-700">+1-234-567-8900</p>
             </div>
           </div>
           
           <!-- Email -->
           <div class="flex items-center">
             <span class="w-10 h-10 flex items-center justify-center rounded-full bg-[#cba157] text-white mr-4">
               <Icon icon="mdi:email" width="20" />
             </span>
             <div>
               <p class="font-bold">Email</p>
               <p class="text-gray-700">info@artplatform.com</p>
             </div>
           </div>
           
           <!-- Horizontal Line -->
           <hr class="my-6 border-gray-300" />
           
           <!-- Social Media -->
           <h2 class="text-2xl font-bold text-gray-900 mb-4">Follow us</h2>
           <div class="flex space-x-4">
             <a href="https://pinterest.com" class="w-10 h-10 flex items-center justify-center rounded-full bg-[#cba157] text-white hover:bg-black transition-colors duration-300">
               <Icon icon="mdi:pinterest" width="20" />
             </a>
             <a href="https://twitter.com" class="w-10 h-10 flex items-center justify-center rounded-full bg-[#cba157] text-white hover:bg-black transition-colors duration-300">
               <Icon icon="mdi:twitter" width="20" />
             </a>
             <a href="https://instagram.com" class="w-10 h-10 flex items-center justify-center rounded-full bg-[#cba157] text-white hover:bg-black transition-colors duration-300">
               <Icon icon="mdi:instagram" width="20" />
             </a>
             <a href="https://facebook.com" class="w-10 h-10 flex items-center justify-center rounded-full bg-[#cba157] text-white hover:bg-black transition-colors duration-300">
               <Icon icon="mdi:facebook" width="20" />
             </a>
           </div>
         </div>

         <!-- Message Form (Imported from message.svelte) -->
         <Message />
       </div>
     </section>