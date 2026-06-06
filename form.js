// const submit = document.getElementById("submit")
// const form = document.querySelector("#form")
// const success = document.querySelector(".section")


// form.addEventListener("submit" , async function (event) {
//     event.preventDefault();
//     console.log("START");
// console.log(submit);
// console.log(form);
// console.log(success);
//     submit.innerHTML = "loading . . . "
//     const formData = new FormData(form)

//     try{
//         await fetch("https://script.google.com/macros/s/AKfycbxvFNwEGOAFFRTO1XIFXHoRWg5X4fycMAceaeCInyE/dev",{
//             method: "POST",
//             body: formData,
//             mode: "no-cors"
//         })
//         success.innerHTML = `<div class="flex justify-center flex-col items-center">
        
//         <p class="text-4xl text-white font-bold m-3 text-center">
//           Form Submitted <span>SUCCESSFULLY!</span>
//         </p>
//         <p class="text-center text-white">
//           The data survived the journey and made it to my inbox without  any ERROR 😎. Thanks for sharing your project details. I'll review everything carefully and reach out soon to discuss how we can bring your idea to life.
//         </p>
//       </div> `
//      } catch(e){
//             success.innerHTML = `<div class="flex justify-center flex-col items-center">
        
//         <p class="text-4xl text-white font-bold m-3 text-center">
//           <span>Oops!</span>
//         </p>
//         <p class="text-center text-white">
//           ⚠️ Something went wrong while sending your project details. Please try again, or reach out to me directly and I'll make sure your message gets through.
//         </p>
//       </div> `
//     }
// })

