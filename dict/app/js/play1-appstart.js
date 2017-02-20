require( ['dictload'], function(dictLoad){
	var self = this;
	
	this.cookie = function( cookieName, val )
	{
		if( typeof val !== 'undefined' )
		{
			localStorage.setItem(cookieName,val)
		}
		return localStorage.getItem(cookieName);
	}
	
	if( self.cookie("PageNumber") != null )
	{
		$( '#pageNumber' ).val( self.cookie("PageNumber") );
	}
	if( self.cookie("TabName") != null )
	{
		$( '.dictNavTab.active' ).removeClass( 'active' );
		$( '.dictNavTab' ).each(function(index,val){
			if( self.cookie("TabName") == $(this).text() )
			{
				$( this ).addClass( 'active' );
				return false;
			}
		});
	}
	this.MaxCountToShowPerPage = 20;
	
	$( 'tr .dictMyRev' ).click(function(e){
		console.log("Test");
	});
	
	$( '.dictNavTab' ).click(function( e ){
			$( '.dictNavTab.active' ).removeClass( 'active' );
			$( this ).addClass( 'active' );
			self.tabClicked( $(this).text(), $( '#pageNumber' ).val() );
			self.cookie("TabName", $(this).text());
	});
	
	$( '#dictNavLeft' ).click(function(e){
		try{
			var currPageNum = parseInt($( '#pageNumber' ).val());
			if( currPageNum - 1 >= 1 )
			{
				currPageNum--;
				$( '#pageNumber' ).val(currPageNum);
				self.pageChanged();
			}
		}catch(err){
			console.log( err );
		}
	});
	
	$( '#dictNavRight' ).click(function(e){
		try{
			var displayThis = dictLoad[ 'get' + self.currSelectedNav() ]();
			var currPageNum = parseInt($( '#pageNumber' ).val());
			if( currPageNum + 1 < ( displayThis.length / self.MaxCountToShowPerPage ) )
			{
				currPageNum++;
				$( '#pageNumber' ).val(currPageNum);
				self.pageChanged();
			}
		}catch(err){
			console.log( err );
		}
	});
	
	$( '#pageNumber' ).keyup(function(e){
		self.pageChanged();
	});
	
	this.pageChanged = function(){
		try{
			var currPageNum = parseInt($( '#pageNumber' ).val());
			self.tabClicked( self.currSelectedNav(), currPageNum );
			self.cookie("PageNumber", currPageNum);
		}catch(err){
			console.log( err );
		}
	};
	
	this.myRevAdd= function(tab, word, value){
		var obj = self.cookie( 'MyFav' );
		if( obj == null )
		{
			obj = {};
		}
		else
		{
			obj = JSON.parse( obj );
		}
		if( typeof obj[tab] === 'undefined' )
		{
			obj[tab]={};
		}
		obj[tab][word]=value;
		self.cookie( 'MyFav',JSON.stringify( obj ));
	};
	
	this.myRevRemove= function(tab, word){
		var obj = self.cookie( 'MyFav' );
		if( obj == null )
		{
			obj = {};
		}
		else
		{
			obj = JSON.parse( obj );
		}
		if( typeof obj[tab] === 'undefined' )
		{
			obj[tab]={};
		}
		if( typeof obj[tab][word] !== 'undefined'  )
		{
			delete obj[tab][word];
		}
		self.cookie( 'MyFav', JSON.stringify( obj ) );
	};
	
	this.tabClicked = function(textToActOn, pageNum){
		var displayThis = dictLoad[ 'get' + textToActOn ]();
		$( '.dictData' ).empty();
		var objKey ;
		var end = pageNum * self.MaxCountToShowPerPage;
		end = end > displayThis.length ? displayThis.length:end;
		var start = end-self.MaxCountToShowPerPage < 0?0:end-self.MaxCountToShowPerPage; 
		var tr, td;
		for(var i=start;i<end;i++)
		{
			objKey = Object.keys( displayThis[i] );
			tr = document.createElement('tr');
			td = document.createElement('td');
			$(td).addClass( 'dictMyRev glyphicon' );
			if( textToActOn == 'SurabhiRevision' )
			{
				$(td).addClass( 'dictMyRev glyphicon glyphicon-star' );
			}
			else
			{
				$(td).addClass( 'dictMyRev glyphicon glyphicon-star-empty' );
			}
			$(td).data('Key', objKey);
			$(td).data('Value', displayThis[i][objKey]);
			$(tr).append( td );
			td = document.createElement('td');
			$(td).text(objKey);
			$(tr).append( td );
			td = document.createElement('td');
			$(td).text(objKey);
			$(tr).append( displayThis[i][objKey] );
			if( textToActOn != 'SurabhiRevision' )
			{
				$(tr).click(function(){
					var found =false;
					$(this).find( '.glyphicon-star-empty' ).each(function(index, val){
						self.myRevAdd(textToActOn, $(this).data('Key'), $(this).data('Value'));
						$(val).removeClass( 'glyphicon-star-empty' );
						$(val).addClass( 'glyphicon-star' );
						found =true;
						return false;
					});
					if(!found){
						$(this).find( '.glyphicon-star' ).each(function(index, val){
							self.myRevRemove(textToActOn, $(this).data('Key'));
							$(val).removeClass( 'glyphicon-star' );
							$(val).addClass( 'glyphicon-star-empty' );
						});
					}
				});
			}
			$( '.table' ).append( tr );
		}
	};
	
	this.currSelectedNav = function(){
		return $( '.dictNavTab.active' ).text();
	}
	
	self.tabClicked( self.currSelectedNav(), $( '#pageNumber' ).val() );	//first time load call
});