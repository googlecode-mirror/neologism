if( Drupal.jsEnabled ) {
	$(document).ready( function() {
		// need for the Ext module
		Ext.QuickTips.init();
		
		// we need to check for the form and later ask for the rest
		if ( Neologism.superclassesTreePanel !== undefined ) {
			Neologism.superclassesTreePanel.render(Neologism.superclassesTreePanel.objectToRender);
		}
		
		if ( Neologism.disjointwithTreePanel !== undefined ) {
			Neologism.disjointwithTreePanel.render(Neologism.disjointwithTreePanel.objectToRender);
		}
		
		if ( Neologism.domainTermsTree !== undefined ) {
			Neologism.domainTermsTree.render(Neologism.domainTermsTree.objectToRender);
		}
		
		if ( Neologism.rangeTermsTree !== undefined ) {
			Neologism.rangeTermsTree.render(Neologism.rangeTermsTree.objectToRender);
		}
		
		if ( Neologism.superpropertyTermsTree !== undefined ) {
			Neologism.superpropertyTermsTree.render(Neologism.superpropertyTermsTree.objectToRender);
		}
		
		if ( Neologism.inverseTermsTree !== undefined ) {
			// if Neologism.domainsTermsTree is defined we are in the add/edit property form
			Neologism.domainTermsTree.addObserver(Neologism.inverseTermsTree);
			Neologism.rangeTermsTree.addObserver(Neologism.inverseTermsTree);
			
			// this implicit event fire is to get the rootNode in inverseTermsTree to handle empty values for domain and range
			Neologism.domainTermsTree.fireEvent('selectionchange', Neologism.domainTermsTree.rootNode);
			Neologism.inverseTermsTree.render(Neologism.inverseTermsTree.objectToRender);
		}
		
//		if (Neologism.classesTreeViewPanel !== undefined && Neologism.propertiesTreeViewPanel !== undefined) {
//			Neologism.classesTreeViewPanel.render();
//			Neologism.propertiesTreeViewPanel.render();
//			Neologism.classesTreeViewPanel.on('fullexpanded', Neologism.checkTreeViewsHeight);
//			Neologism.propertiesTreeViewPanel.on('fullexpanded', Neologism.checkTreeViewsHeight);
//		}
		
		    //$('#edit-field-literal-as-range-value').click(Neologism.checkRangeField);
		// check if the checkbox is checked is so, then hide rangeField show it otherwise
		//Neologism.checkRangeField();
		Neologism.checkResourceType();
		
        // Prepare custom namespace selection widget
        // Move custom namespace edit field next to the "Custom" radio button
        $('#edit-namespace-1-wrapper').append($('#edit-custom-namespace'));
        $('#edit-custom-namespace-wrapper').remove();
        // Enable and disable the custom namespace field as required
        if ($('#edit-namespace-0').attr('checked')) {
            $('#edit-custom-namespace').attr('disabled', true);
        }
        $('#edit-namespace-0').click(function() {
            $('#edit-custom-namespace').attr('disabled', true);
        });
        $('#edit-namespace-1').click(function() {
            $('#edit-custom-namespace').attr('disabled', false);
        });
        // Update the default namespace URI with the vocabulary ID
        setInterval(function() {
            var vocabID = $('#edit-prefix').val();
            if (vocabID) {
              $('#neologism-default-ns').empty().text(vocabID);
            } else {
              $('#neologism-default-ns').empty().html('<em>vocabulary-id</em>');
            }
        }, 250);
		
		// this is used when all the content type form are shown the title field should take the focus
		$('#edit-prefix').focus();
	}); // ready

	Neologism.checkResourceType = function() {
	    // Another resource
		if ( $('#edit-resource-type-1').attr('checked') ) {
			$('#range-group-datatypes').hide();
			$('#range-treeview').show();
		}
		// A literal (string, number, date, ...)
		else if ( $('#edit-resource-type-2').attr('checked') ) {
			$('#range-treeview').hide();
			$('#range-group-datatypes').show();
			// the inverse selection widget should be hidden if the range field also are hidden
			Neologism.rangeTermsTree.clearValues();
		}
		// Either
		else if ( $('#edit-resource-type-3').attr('checked') ) {
			$('#range-group-datatypes').hide();
			$('#range-treeview').hide();
			Neologism.rangeTermsTree.clearValues();
	    }
	  };
	  
	  /**
	   * 
	   */
	  Neologism.checkTreeViewsHeight = function(object) {
		  if (object.name == 'classesTreeViewPanel') {
			  Neologism.ctpHeight = object.newHeight;
		  }
		  else if (object.name == 'propertiesTreeViewPanel') {
			  Neologism.ptpHeight = object.newHeight;
		  }
		  
		  if (typeof Neologism.ctpHeight !== 'undefined' && typeof Neologism.ptpHeight !== 'undefined') {
			  var maxHeight = (Neologism.ctpHeight > Neologism.ptpHeight) ? Neologism.ctpHeight : Neologism.ptpHeight; 
			  $('#ext-gen5').animate({height:maxHeight}, 0);
			  $('#ext-gen11').animate({height:maxHeight}, 0);
		  }
	  };
}
