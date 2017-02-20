define(['data_adj','data_adv','data_noun','data_verb'],
	function(dataAdj, dataAdv, dataNoun, dataVerb){
		this.cookie = function( cookieName, val ) {
			if( typeof val !== 'undefined' )
			{
				localStorage.setItem(cookieName,val)
			}
			/*if( typeof doRemove !== 'undefined' && doRemove )
			{
				localStorage.removeItem(cookieName);
			}*/
			return localStorage.getItem(cookieName);
		};
	
		this.getAdjective = function(){
			return dataAdj;
		};
		this.getAdverb = function(){
			return dataAdv;
		};
		this.getNoun = function(){
			return dataNoun;
		};
		this.getVerb = function(){
			return dataVerb;
		};
		this.getSurabhiRevision = function(){
			var obj = self.cookie( 'MyFav' );
			if( obj == null )
			{
				obj = {};
			}
			else
			{
				obj = JSON.parse( obj );
			}
			var returnValue = [];
			var allKeys = Object.keys( obj );
			var dataStore;
			for(var i=0;i<allKeys.length;i++)
			{
				for(var word in obj[allKeys[i]] )
				{
					dataStore = {};
					dataStore[word]=obj[allKeys[i]][word];
					returnValue.push( dataStore );
				}
			} 
			return returnValue;
		};
		return this;
	}
);