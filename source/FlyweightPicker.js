enyo.kind({
	name: "onyx.FlyweightPicker",
	kind: "onyx.Picker",
	classes: "onyx-flyweight-picker",
	published: {
		//* How many rows to render
		rows: 0
	},
	events: {
		//* Sends the row index, and the row control, for decoration
		onSetupRow: ""
	},
	components: [
		{name: "scroller", kind: "enyo.Scroller", strategyKind: "TouchScrollStrategy", components: [
			{name: "client", kind: "FlyweightRepeater", ontap: "itemTap"}
		]}
	],
	scrollerName: "scroller",
	create: function() {
		this.inherited(arguments);
		this.rowsChanged();
	},
	rendered: function() {
		this.inherited(arguments);
		this.selectedChanged();
	},
	scrollToSelected: function() {
		var n = this.$.client.fetchRowNode(this.selected);
		this.getScroller().scrollToNode(n, !this.menuUp);
	},
	rowsChanged: function() {
		this.$.client.rows = this.rows;
	},
	processActivatedItem: function(inItem) {
		this.item = inItem;
	},
	selectedChanged: function(inOld) {
		if (inOld !== undefined) {
			this.item.removeClass("selected");
			this.$.client.renderRow(inOld);
		}
		this.item.addClass("selected");
		this.$.client.renderRow(this.selected);
		// need to remove the class from control to make sure it won't apply to other rows
		this.item.removeClass("selected");
		var n = this.$.client.fetchRowNode(this.selected);
		this.doSelect({selected: this.selected, content: n && n.textContent || this.item.content});
	},
	itemTap: function(inSender, inEvent) {
		this.setSelected(inEvent.rowIndex);
	}
});
