
class Validation 
{
    static isEmailValid(email) {
       let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
       return reg.test(email) == 1;
    }
  
   static isEmpty(inputString) {
       if (inputString == null || inputString == '') {
           return true;
       }else{
           return false;
       }
    }
  
   static isNotValidPassword(inputPassword)
   {
       if(inputPassword.length<6 || inputPassword.length>15) {
           return true;
       }
       else
       {
           return false;
       }
    }

    static isGreater(inputA, inputB){
        if(inputA <= inputB){
            
            return true;
        }
        else
        {
            return false;
        }
    }

}
  
export default Validation;