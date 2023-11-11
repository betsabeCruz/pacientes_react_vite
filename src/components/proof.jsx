(function() {
    // Query all existing AVS application records
    var avsApp = new GlideRecord(' u_cmdb_ci_appl_avs'); // Modify to match your table name
    avsApp.addQuery('u_entry_type', 'NOT IN', ['Department', 'Privacy Asset', 'Tool' ]); // Exclude records with type 'Department' and 'Privacy'
    avsApp.query();

    while (avsApp.next()) {
        // Get the 'Name' and 'Entry Code' from the AVS application record
        var name = avsApp.name; // Modify to match your field name
        var entryCode = avsApp.u_application_entry_code; // Modify to match your field name

        // Create a unique CMDB group name based on 'Name' and 'Entry Code'
        var groupName = name + '_' + entryCode;

        // Ensure the group name doesn't exceed 90 characters
        if (groupName.length > 90) {
            groupName = groupName.substring(0, 90); // Truncate to 90 characters
        }

        // Check if a group with this name already exists
        var group = new GlideRecord('cmdb_ci_group');
        group.addQuery('name', groupName);
        group.query();

        if (!group.next()) {
            // If the group doesn't exist, create it
            var newGroup = new GlideRecord('cmdb_ci_group');
            newGroup.initialize();
            newGroup.name = groupName;
            newGroup.insert();
        }
    }
})();
