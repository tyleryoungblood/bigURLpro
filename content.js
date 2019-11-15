// inject css
var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('styles.css');
(document.head||document.documentElement).appendChild(style);

// show/hide bigURL
if(document.getElementById('kty208bigURLwrapper')) {
   // bigURL is already being displayed. Remove it.
   document.getElementById('kty208bigURLwrapper').remove();
} else {
   // bigURL is not being displayed. Create it. 
   let body = document.body;
   let bigURLwrapper = document.createElement('div')
       bigURLwrapper.setAttribute('id', 'kty208bigURLwrapper')
   let bigURL = document.createElement('h1')
       bigURL.setAttribute('id', 'kty208bigURL')

   // create buttons for increasing/decreasing font size
   let btnBigger = document.createElement('button')
       btnBigger.innerHTML = "+"
   let btnSmaller = document.createElement('button')
       btnSmaller.innerHTML = "-"

   // add bigURLWrapper, bigURL, and bigger/smaller buttons to page
   body.insertBefore(bigURLwrapper, body.firstChild);
   bigURLwrapper.appendChild(bigURL)
   bigURLwrapper.appendChild(btnBigger)
   bigURLwrapper.appendChild(btnSmaller)

   // handle btnBigger and btnSmaller clicks
   // TODO figure out how to get the current font size rather than setting it here
   let currentSize = 60;
   
   btnBigger.onclick = function() { 
      currentSize = parseFloat(currentSize) + 5 + 'px';
      bigURL.style.fontSize = currentSize 
      bigURL.style.lineHeight = currentSize
   }

   btnSmaller.onclick = function() {
      currentSize = parseFloat(currentSize) - 5 + 'px';
      bigURL.style.fontSize = currentSize
      bigURL.style.lineHeight = currentSize * 1.06 + 'px'
   }

   // enable the removal of bigURLwrapper
   bigURL.onclick = function() { bigURLwrapper.remove() }

   // dynamically create a button for each part of the URL
   createButton = function() {
      for (var i=0, j=arguments.length; i<j; i++) {
         let arg = arguments[i]

         // if window.location.arg does't exist, continue to the next iteration
         if(!window.location[arg.toLowerCase()]) continue ;
          
         // url fragment exists, build a span tag a button for it and append
         let slashes = ''
         let colon = ''
         // protocol needs slashes appended
         if (arg === 'Protocol') slashes = '//' 
         // port needs colon prepended
         if (arg === 'Port') colon = ':'
            
         urlFragment = '<span id="'+ arg + '">' + colon + window.location[arg.toLowerCase()] + slashes + '</span>'

         // if url fragment exists, create a button to interact with it
         let id = 'btn'+arguments[i];
         let el = document.createElement('button');
         el.innerHTML = arg;
         el.setAttribute('id', id)

         // add each urlFragment (which is the span created above) to bigURL's innerHTML
         // but use insertAdjacentHTML since you're probably adding more than one fragment
         bigURL.insertAdjacentHTML("beforeend", urlFragment);

         // add created button to bitURLwrapper
         bigURLwrapper.appendChild(el)
      } 
   }

   // call the CreateButton function
   createButton('Protocol', 'Hostname', 'Port', 'Pathname', 'Search', 'Hash')

   // add an event listener to each dynamically created button
   handleBtnEvent = function() {
      var buttons = document.querySelectorAll('[id^="btn"]')
      for (i = 0; i < buttons.length; i++) { 
         buttons[i].addEventListener("click", function() {
            let button = this.innerHTML
            modifyURL(button)
         })
         buttons[i].addEventListener("mouseover", function(){
            this.classList.add('emphasize')
            let btn = document.getElementById(this.innerHTML)
            btn.classList.add('emphasize')
         })
         buttons[i].addEventListener("mouseout", function(){
            this.classList.remove('emphasize')
            let btn = document.getElementById(this.innerHTML)
            btn.classList.remove('emphasize')
         })
      }
   }

   // run the function
   handleBtnEvent();
   
   modifyURL = function (component) {
      let span = document.getElementById(component)
      let btn = document.getElementById('btn'+component)
      if (span === null) return
      span.classList.toggle('hide')
      btn.classList.toggle('hide')
   }
}
