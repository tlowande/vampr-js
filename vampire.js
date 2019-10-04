class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let i = 0;
    let vamp = this
    while(vamp.creator){
      i++
      vamp = vamp.creator 
    }
    return i
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if(this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal){
      return true 
    } else {
      return false
    }
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this === vampire){
      return this
    }
    let senior;
    let junior;
    if(this.isMoreSeniorThan(vampire)){
      senior = this
      junior = vampire
    } else {
      junior = this
      senior = vampire
    }
    
    if(senior.isDirectAncestor(junior)){
      return senior
    } else {
      return senior.creator.closestCommonAncestor(junior)
    }
    
  }
  
  // is a direct ancestor
  // if they are one of my offspring
  //  ...or, they are a direct ancestor of one of my offspring

  isDirectAncestor(vampire) {
    if(this.offspring.includes(vampire)) {
      return true;
    } else {
      for (let v of this.offspring){
        if(v.isDirectAncestor(vampire)){
          return true
        }
      }
    }
    return false
  }

}


module.exports = Vampire;

let Andrew = new Vampire('Andrew', 4);
let Elgort = new Vampire('Elgort', 3);
let Sarah = new Vampire('Sarah', 3);
let Ansel = new Vampire('Ansel', 2);
let Bart = new Vampire('Bart', 2);
let Original = new Vampire('Original', 1);

Elgort.addOffspring(Andrew);
Ansel.addOffspring(Elgort);
Ansel.addOffspring(Sarah);
Original.addOffspring(Ansel);
Original.addOffspring(Bart);


console.log(Ansel.isDirectAncestor(Bart))
// console.log(Elgort.offspring)