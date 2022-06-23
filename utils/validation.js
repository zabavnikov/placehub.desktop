class Validation {
  /**
   * Create a new Errors instance.
   */
  constructor(errors = {}) {
    this.record(errors);
  }

  /**
   * Get all the errors.
   *
   * @return {object}
   */
  all() {
    return this.errors;
  }

  /**
   * Determine if any errors exists for the given field or object.
   *
   * @param {string} field
   */
  has(field) {
    let hasError = this.errors.hasOwnProperty(field);

    if (!hasError) {
      const errors = Object.keys(this.errors).filter(
          e => e.startsWith(`${field}.`) || e.startsWith(`${field}[`)
      );

      hasError = errors.length > 0;
    }

    return hasError;
  }

  first(field) {
    return this.get(field)[0];
  }

  get(field) {
    return this.errors[field] || [];
  }

  /**
   * Determine if we have any errors.
   */
  any() {
    return Object.keys(this.errors).length > 0;
  }

  /**
   * Record the new errors.
   *
   * @param {array} errors
   */
  record(errors) {
    if (errors.length) {
      errors = errors[0].extensions;

      if (errors.category === 'validation') {
        this.errors = errors.validation;
      }
    } else {
      this.errors = {};
    }
  }

  /**
   * Clear a specific field, object or all error fields.
   *
   * @param {string|null} field
   */
  clear(field) {
    if (!field) {
      this.errors = {};

      return;
    }

    let errors = Object.assign({}, this.errors);

    Object.keys(errors)
        .filter(e => e === field || e.startsWith(`${field}.`) || e.startsWith(`${field}[`))
        .forEach(e => delete errors[e]);

    this.errors = errors;
  }
}

export default Validation;