class Moodgrid {

  constructor() {

    // Triggers
    this.cells   = Array.from(document.querySelectorAll('.grid-col-cells.fill span'));
    this.moods   = Array.from(document.querySelectorAll('.options li'));
    this.delete  = Array.from(document.querySelectorAll('#deleteAccount'));

    // Grid Legend
    this.moodCode = {
      "unassigned":   0,
      "very-light":        1,
      "light":        2, 
      "moderate":   3, 
      "vigorous":          4,
      "very-hard":      5, 
      "maximum-effort":         6,
      "tired":        7, 
    }

    // Misc
    this.active = {
      month: undefined,
      day: undefined
    };

  }

  initialize() {
    this.events();
  }

  events() {
    this.cells.forEach(day => {
      day.addEventListener('click', this.setActive.bind(this));
    })

    this.moods.forEach(mood => {
      mood.addEventListener('click', this.setMood.bind(this));
    })

    this.moods.forEach(mood => {
      mood.addEventListener('mouseover', this.preview.bind(this));
    }) 

    this.delete.forEach(del => {
      del.addEventListener('click', this.deleteAccount.bind(this))
    })
  }

  setActive(e) {
    this.active.month = e.target.parentNode.getAttribute("month");
    this.active.day = +e.target.getAttribute("day");
    this.render();
  }

  async setMood(e) {
    try{
      let mood = this.moodCode[e.target.parentNode.classList[0]];
      await fetch('dashboard/save', {
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
              'day': this.active.day,
              'month': this.active.month,
              'mood': mood,
          })
      })
      location.reload()
    } catch(err) {
      console.log(err)
    }
  }

  async deleteAccount() {
    try{
      await fetch('dashboard/delete', {
          method: 'delete',
          headers: {'Content-type': 'application/json'},
          body: ''
      })
      location.reload()
    } catch(err) {
      console.log(err)
    }
  }

  clearActive() {
    this.active.month = undefined;
    this.active.day = undefined;
  }

  render() {
    this.cells.forEach(a => a.classList.remove('active'));
    let cellActive = document.querySelector(`.grid-col-cells.fill[month="${this.active.month}"] span[day="${this.active.day}"]`);
    cellActive.classList.add('active');
  }

  preview(e) {
    if (this.active.month && this.active.day) {
      let moodActive = e.target.parentNode.classList[0];
      let cellActive = document.querySelector(`.grid-col-cells.fill[month="${this.active.month}"] span[day="${this.active.day}"]`);
      cellActive.classList = `active ${moodActive}`;
    }
  }

}

const session = new Moodgrid();
session.initialize();
