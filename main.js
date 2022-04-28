// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      let randomIndex = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();
      while(newBase === this.dna[randomIndex]) {
        newBase = returnRandBase();
      }
      this.dna[randomIndex] = newBase;
      return this.dna
    },
    compareDNA(pAequor) {
      let identicals = 0;
      for(i=0; i<15; i++) {        
        if(this.dna[i] === pAequor.dna[i]) {
          identicals++
          //console.log(i, identicals, this.dna[i], pAequor.dna[i])
        }
      }
      return 100*identicals/15
      //console.log(`This specimen with number ${this.specimenNum} has ${100*identicals/15}% of DNA in common with specimen ${pAequor.specimenNum}`)
    },
    willLikelySurvive() {
      let cOrG = 0;
      for(base in this.dna) {
        if(this.dna[base] === 'C' || this.dna[base] === 'G') {
          cOrG++
        }
      }
      if(100*cOrG/15 >= 60) {
        return true
      } else {
        return false
        }
    }
  }
};

strongSpecimens = [];
let count = 0;
let newborn;
while(strongSpecimens.length<31) {
  newborn = pAequorFactory(count+3, mockUpStrand());
  if(newborn.willLikelySurvive()) {
    strongSpecimens.push(newborn)
  }
  count++
}

const zenon = pAequorFactory(2, mockUpStrand());

const leszek = pAequorFactory(1, mockUpStrand());




const mutationsToSucceed = (pAequor) => {
  let mutation = 0;
  while(!pAequor.willLikelySurvive()) {
    pAequor.mutate();
    mutation++;
  }
  return mutation
}

const batch = [];
for(i=0; i<1000; i++) {
  batch.push(pAequorFactory(1000+i, mockUpStrand()))
}

const findMostSimilar = arr => {
  comparisons = [];
  let firstToCompare;
  for(i in arr) {
    firstToCompare = arr[i];
    for(j=0; j<arr.length; j++) {
      if(firstToCompare.specimenNum !== arr[j].specimenNum) {
        let sample = firstToCompare.compareDNA(arr[j]);
        comparisons.push([firstToCompare.specimenNum, arr[j].specimenNum, sample]);
      }     
    }
    //console.log(comparisons)
  }
  comparisons.sort((a, b) => b[2] - a[2]);
  return comparisons.slice(0, 10)
}

console.log("top 10 most identical pairs are: ");
console.table(findMostSimilar(batch))

/*
count = 0;
let total = 0;
while(count<100000) {
  let test = mutationsToSucceed(pAequorFactory(1000+count, mockUpStrand()));
  //console.log(count, test);
  count++;
  total += test
}
console.log(`becomes strong after average of ${total/100000} mutations`)
*/
  


