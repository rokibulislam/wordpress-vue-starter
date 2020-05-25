<template>
  <div class="app-settings">
    The Settings Page
    <div class="dokan-settings-wrap">
      <h2 class="nav-tab-wrapper">
        <template v-for="section in settingSections">
          <a
            href="#"
            :class="['nav-tab', currentTab === section.id ? 'nav-tab-active' : '']"
            @click.prevent="changeTab(section)"
          >
            <span class="dashicons" :class="section.icon"></span>
            {{ section.title }}
          </a>
        </template>
        <div class="metabox-holder">
          <template v-for="(fields, index) in settingFields">
            <div :id="index" class="group" v-if="currentTab === index">
              <form method="post" action="options.php">
                <table class="form-table">
                  <Field
                    v-for="(field, fieldId) in fields"
                    :field-data="field"
                    :id="fieldId"
                    :section-id="index"
                    :key="fieldId"
                    :field-value="settingValues[index]"
                    :all-settings-values="settingValues"
                    :errors="errors"
                  />
                </table>
              </form>
            </div>
          </template>
        </div>
      </h2>
    </div>
  </div>
</template>

<script>
import Field from "./Fields.vue";

export default {
  name: "Settings",
  components: {
    Field
  },
  data() {
    return {
      isSaved: false,
      showLoading: false,
      isUpdated: false,
      isLoaded: false,
      message: "",
      currentTab: null,
      settingSections: [],
      settingFields: {},
      settingValues: {},
      requiredFields: [],
      errors: []
    };
  },

  created() {},

  methods: {
    changeTab(section) {
      this.currentTab = section.id;
    },
    fetchSettingValues() {}
  },
  created() {
    this.fetchSettingValues();

    this.currentTab = "general";
    this.settingSections = base_plugin.settings_sections;
    this.settingFields = base_plugin.settings_fields;
  }
};
</script>

<style lang="css" scoped>
</style>
