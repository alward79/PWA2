/*  
	Your Project Design Creation
	Author: Angelena Ward
*/

(function($){
	
	
	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
	
	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				// if user, loadApp()
				// if error, loadLanding()
			}
		});
	};
	
	

	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
	
		checkLoginState();
	};
	
	
	init();
	
		
	/*
	===============================================
	======================================== EVENTS	
	*/
	/*==========Accordion Menu==========*/
	$("#accordion > li").click(function(){

		if(false == $(this).next().is(':visible')) {
			$('#accordion > ul').slideUp(300);
		}
		$(this).next().slideToggle(300);
	});
	
	/*==========Popup Menu==========*/
	$('#accordion > ul:eq(0)').show();
    
  	$('#load').click( function() {            
       	loadPopupBox(); 
   	});
        
 	$('#addbtn').click( function() {
      	unloadPopupBox();
   	});

	// TO Unload the Popupbox
   	function unloadPopupBox() {    
      	$('#popup').fadeOut("slow");
     	$("#contain").css({"opacity": "1"}); 
  	}   
	 
    // To Load the Popupbox    
 	function loadPopupBox() {    
     	$('#popup').fadeIn("slow");
      	$("#contain").css({"opacity": "1"});         
   	}        
	
	/*	
	==================================== END EVENTS 
	===============================================
	*/

})(jQuery); // end private scope


