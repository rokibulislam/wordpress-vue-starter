<template>
<div>
    <!-- <pre>{{ notifications.length }}</pre> -->
    <a href="#" class="button button-secondary add-notification" v-on:click.prevent="addNew"><span class="dashicons dashicons-plus-alt"></span> <?php _e( 'Add Notification', 'formsuite' ); ?></a>

    <div :class="[editing ? 'editing' : '', 'notification-wrap']">
    <!-- notification-wrap -->

        <div class="notification-table-wrap">
            <table class="wp-list-table widefat fixed striped posts formsuite-cf-notification-table">
                <thead>
                    <tr>
                        <th class="col-toggle">&nbsp;</th>
                        <th class="col-name"><?php _e( 'Name', 'formsuite' ); ?></th>
                        <th class="col-subject"><?php _e( 'Subject', 'formsuite' ); ?></th>
                        <th class="col-action">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(notification, index) in notifications">
                        <td class="col-toggle">
                            <a href="#" v-on:click.prevent="toggelNotification(index)">
                                <img v-if="notification.active" src="<?php echo FormSuite_ASSET_URI; ?>/images/active.png" width="24" alt="status">
                                <img v-else src="<?php echo FormSuite_ASSET_URI; ?>/images/inactive.png" width="24" alt="status">
                            </a>
                        </td>
                        <td class="col-name"><a href="#" v-on:click.prevent="editItem(index)">{{ notification.name }}</a></td>
                        <td class="col-subject">{{ notification.type === 'email' ? notification.subject : notification.smsText }}</td>
                        <td class="col-action">
                            <a href="#" v-on:click.prevent="duplicate(index)" title="<?php esc_attr_e( 'Duplicate', 'formsuite' ); ?>"><span class="dashicons dashicons-admin-page"></span></a>
                            <a href="#" v-on:click.prevent="editItem(index)" title="<?php esc_attr_e( 'Settings', 'formsuite' ); ?>"><span class="dashicons dashicons-admin-generic"></span></a>
                        </td>
                    </tr>
                    <tr v-if="!notifications.length">
                        <td colspan="4"><?php _e( 'No notifications found', 'formsuite' ); ?></td>
                    </tr>
                </tbody>
            </table>
        </div><!-- .notification-table-wrap -->

        <div class="notification-edit-area" v-if="notifications[editingIndex]">

            <div class="notification-head">
                <input type="text" name="" v-model="notifications[editingIndex].name" v-on:keyup.enter="editDone()" value="Admin Notification">
            </div>

            <div class="form-fields">

                <div class="notification-row notification-field">
                    <label for="notification-title"><?php _e( 'Type', 'formsuite' ); ?></label>
                    <select type="text" v-model="notifications[editingIndex].type">
                        <option value="email"><?php _e( 'Email Notification', 'formsuite' ); ?></option>
                        <option value="sms"><?php _e( 'SMS Notification', 'formsuite' ); ?></option>
                    </select>
                </div>

                <template v-if="notifications[editingIndex].type == 'email' ">
                    <div class="notification-row">
                        <div class="row-one-half notification-field first">
                            <label for="notification-title"><?php _e( 'To', 'formsuite' ); ?></label>
                            <input type="text" v-model="notifications[editingIndex].to">
                            <formsuite-merge-tags filter="email_address" v-on:insert="insertValue" field="to"></formsuite-merge-tags>
                        </div>

                        <div class="row-one-half notification-field">
                            <label for="notification-title"><?php _e( 'Reply To', 'formsuite' ); ?></label>
                            <input type="email" v-model="notifications[editingIndex].replyTo">
                            <formsuite-merge-tags filter="email_address" v-on:insert="insertValue" field="replyTo"></formsuite-merge-tags>
                        </div>
                    </div>

                    <div class="notification-row notification-field">
                        <label for="notification-title"><?php _e( 'Subject', 'formsuite' ); ?></label>
                        <input type="text" v-model="notifications[editingIndex].subject">
                        <formsuite-merge-tags v-on:insert="insertValue" field="subject"></formsuite-merge-tags>
                    </div>

                    <div class="notification-row notification-field">
                        <label for="notification-title"><?php _e( 'Email Message', 'formsuite' ); ?></label>

                        <formsuite-text-editor
                            v-model="notifications[editingIndex].message"
                            :i18n="i18n"
                            :editingIndex="editingIndex"
                        >
                        </formsuite-text-editor>

                        <formsuite-merge-tags v-on:insert="insertValueEditor" field="message"></formsuite-merge-tags>
                    </div>
                </template>
                <template v-else>
                    <template v-if="has_sms">
                        <div class="notification-row notification-field">
                            <label for="notification-title"><?php _e( 'To', 'formsuite' ); ?></label>
                            <input type="text" v-model="notifications[editingIndex].smsTo">
                            <formsuite-merge-tags v-on:insert="insertValue" field="smsTo"></formsuite-merge-tags>
                        </div>
                        <div class="notification-row notification-field">
                            <label for="notification-title"><?php _e( 'SMS Text', 'formsuite' ); ?></label>
                            <textarea name="" rows="6" v-model="notifications[editingIndex].smsText"></textarea>
                            <formsuite-merge-tags v-on:insert="insertValue" field="smsText"></formsuite-merge-tags>
                        </div>
                    </template>
                    <template v-else>
                        <p>
                            <label class="formsuite-pro-text-alert">
                                <a :href="pro_link" target="_blank"><?php _e( 'SMS notification moule not found', 'formsuite' ); ?></a>
                            </label>
                        </p>
                    </template>
                </template>

                <section class="advanced-fields">
                    <a href="#" class="field-toggle" v-on:click.prevent="toggleAdvanced()"><span class="dashicons dashicons-arrow-right"></span><?php _e( ' Advanced', 'formsuite' ); ?></a>

                    <div class="advanced-field-wrap">
                        <p class="formsuite-pro-text-alert"><?php _e( 'Make sure that your mail server is configured properly for the following "From" fields', 'formsuite' ); ?></p>
                        <template v-if="notifications[editingIndex].type == 'email' ">
                            <div class="notification-row">
                                <div class="row-one-half notification-field first">
                                    <label for="notification-title"><?php _e( 'From Name', 'formsuite' ); ?></label>
                                    <input type="text" v-model="notifications[editingIndex].fromName">
                                    <formsuite-merge-tags v-on:insert="insertValue" field="fromName"></formsuite-merge-tags>
                                </div>

                                <div class="row-one-half notification-field">
                                    <label for="notification-title"><?php _e( 'From Address', 'formsuite' ); ?></label>
                                    <input type="email" name="" v-model="notifications[editingIndex].fromAddress">
                                    <formsuite-merge-tags filter="email_address" v-on:insert="insertValue" field="fromAddress"></formsuite-merge-tags>
                                </div>
                            </div>

                            <div class="notification-row">
                                <div class="row-one-half notification-field first">
                                    <label for="notification-title"><?php _e( 'CC', 'formsuite' ); ?></label>
                                    <input type="email" name="" v-model="notifications[editingIndex].cc">
                                    <formsuite-merge-tags filter="email_address" v-on:insert="insertValue" field="cc"></formsuite-merge-tags>
                                </div>

                                <div class="row-one-half notification-field">
                                    <label for="notification-title"><?php _e( 'BCC', 'formsuite' ); ?></label>
                                    <input type="email" name="" v-model="notifications[editingIndex].bcc">
                                    <formsuite-merge-tags filter="email_address" v-on:insert="insertValue" field="bcc"></formsuite-merge-tags>
                                </div>
                            </div>
                        </template>

                        <div class="notification-row notification-field">
                            <template v-if="is_pro">

                                <notification-conditional-logics
                                    :notification="notifications[editingIndex]"
                                >
                                </notification-conditional-logics>

                            </template>
                            <template v-else>
                                <label class="formsuite-pro-text-alert">
                                    <a :href="pro_link" target="_blank"><?php _e( 'Conditional Logics available in Pro Version', 'formsuite' ); ?></a>
                                </label>
                            </template>
                        </div>
                    </div>
                </section><!-- .advanced-fields -->
            </div>

            <div class="submit-area">
                <a href="#" v-on:click.prevent="deleteItem(editingIndex)" title="<?php esc_attr_e( 'Delete', 'formsuite' ); ?>"><span class="dashicons dashicons-trash"></span></a>
                <button class="button button-secondary" v-on:click.prevent="editDone()"><?php _e( 'Done', 'formsuite' ); ?></button>
            </div>
        </div><!-- .notification-edit-area -->

    </div><!-- .notification-wrap -->
</div>

</template>
<script>
    export default {
        name:'formsuite-cf-form-notification',
        mixins: [formSuite.mixins.Loading],
        data: function() {
            return {
                editing: false,
                editingIndex: 0,
            };
        },

        computed: {
            is_pro: function() {
                return 'true' === formSuite.is_pro;
            },
            has_sms: function() {
                return 'true' === formSuite.has_sms;
            },
            pro_link: function() {
                return formsuite_form_builder.pro_link;
            },
            notifications: function() {
                return this.$store.state.notifications;
            },

            hasNotifications: function() {
                return Object.keys( this.$store.state.notifications ).length;
            }
        },

        methods: {
            addNew: function() {
                this.$store.commit('addNotification', formsuite_form_builder.defaultNotification);
            },

            editItem: function(index) {
                this.editing = true;
                this.editingIndex = index;
            },

            editDone: function() {
                this.editing = false;

                this.$store.commit('updateNotification', {
                    index: this.editingIndex,
                    value: this.notifications[this.editingIndex]
                });

                jQuery('.advanced-field-wrap').slideUp('fast');
            },

            deleteItem: function(index) {
                if ( confirm( 'Are you sure' ) ) {
                    this.editing = false;
                    this.$store.commit( 'deleteNotification', index);
                    this.$emit('deleteNotification', index);
                }
            },

            toggelNotification: function(index) {
                this.$store.commit('updateNotificationProperty', {
                    index: index,
                    property: 'active',
                    value: !this.notifications[index].active
                });
            },

            duplicate: function(index) {
                this.$store.commit('cloneNotification', index);
            },

            toggleAdvanced: function() {
                jQuery('.advanced-field-wrap').slideToggle('fast');
            },

            insertValue: function(type, field, property) {
                var notification = this.notifications[this.editingIndex],
                    value = ( field !== undefined ) ? '{' + type + ':' + field + '}' : '{' + type + '}';

                notification[property] = notification[property] + value;
            },

            insertValueEditor: function(type, field, property) {
                var value = ( field !== undefined ) ? '{' + type + ':' + field + '}' : '{' + type + '}';
                this.$emit('insertValueEditor', value);
            },
        }
    }
</script>
