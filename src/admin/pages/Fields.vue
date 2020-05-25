<template>
  <tr :class="[id, `dokan-settings-field-type-${fieldData.type}`]">
    <template v-if=" 'sub_section' === fieldData.type">
      <th colspan="2" class="dokan-settings-sub-section-title">
        <label>{{ fieldData.label }}</label>
      </th>
    </template>
    <template v-if="containCommonFields( fieldData.type )">
      <th scope="row">
        <label :for="sectionId + '[' + fieldData.name + ']'">{{ fieldData.label }}</label>
      </th>
      <td>
        <input
          type="text"
          class="regular-text"
          :id="sectionId + '[' + fieldData.name + ']'"
          :class="sectionId + '[' + fieldData.name + ']'"
          v-model="fieldValue[fieldData.name]"
        />
      </td>
    </template>

    <template v-if="'checkbox' == fieldData.type">
      <th scope="row">
        <label :for="sectionId + '[' + fieldData.name + ']'">{{ fieldData.label }}</label>
      </th>
      <td>
        <fieldset>
          <label :for="sectionId + '[' + fieldData.name + ']'">
            <input
              type="checkbox"
              class="checkbox"
              :id="sectionId + '[' + fieldData.name + ']'"
              :class="sectionId + '[' + fieldData.name + ']'"
            />
          </label>
        </fieldset>
      </td>
    </template>

    <template v-if="'select' == fieldData.type">
      <th scope="row">
        <label :for="sectionId + '[' + fieldData.name + ']'">{{ fieldData.label }}</label>
      </th>

      <td>
        <select
          :name="sectionId + '[' + fieldData.name + ']'"
          :id="sectionId + '[' + fieldData.name + ']'"
          :class="sectionId + '[' + fieldData.name + ']'"
        >
          <option
            v-for="( optionVal, optionKey ) in fieldData.options"
            :value="optionKey"
            v-html="optionVal"
          ></option>
        </select>
      </td>
    </template>

    <template v-if="'radio' == fieldData.type">
      <th scope="row">
        <label :for="sectionId + '[' + fieldData.name + ']'">{{ fieldData.label }}</label>
      </th>
      <td class="dokan-settings-field-type-radio">
        <fieldset>
          <template v-for="( optionVal, optionKey ) in fieldData.options">
            <label :for="sectionId + '[' + fieldData.name + '][' + optionKey + ']'">
              <input
                type="radio"
                :id="sectionId + '[' + fieldData.name + '][' + optionKey + ']'"
                class="radio"
                :name="optionKey"
                :value="optionKey"
              />
              {{ optionVal }}
            </label>
          </template>
        </fieldset>
        <p class="description" v-html="fieldData.desc"></p>
      </td>
    </template>
  </tr>
</template>

<script>
export default {
  name: "Field",
  props: [
    "fieldData",
    "id",
    "sectionId",
    "fieldValue",
    "allSettingsValues",
    "errors"
  ],
  components: {},
  data() {
    return {
      msg: "Welcome to Your Vue.js Admin App"
    };
  },

  created() {},

  mounted() {},

  methods: {
    containCommonFields(type) {
      return ["text", "url", "phone"].includes(type);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
