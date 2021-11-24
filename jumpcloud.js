import http from "k6/http";
import { check, group } from "k6";

const payload = JSON.stringify({
  password: 'angrymonkey',
});

const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};


export default function jumpcloud() {
  
  group("post to has point", function () {
      let url ='http://127.0.0.1:8088/hash';
      let response = http.post(url, payload, params);
      console.log("response = "+response.status)
      let jobID = response
      console.log("JobID = "+ JSON.stringify(jobID.json()));
    });

  group("get encoded password", function () {
    let url ='http://127.0.0.1:8088/hash/1';
    let response = http.get(url,null,params);

    let hash = response.body;
    console.log(hash);

    let base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
      if (base64regex.test(hash) == true){
            return  console.log("Hash base64 = "+base64regex.test(hash));   
      }else{
        console.log("Hash base64 = "+base64regex.test(hash));
      }   
   });


   group("get stats", function () {
    let url ='http://127.0.0.1:8088/stats';
    let response = http.get(url,null,params);
    //console.log("Status = "+JSON.stringify(response));

    let status = response.status
    console.log("Status = "+JSON.stringify(status));

    let totalRequest = JSON.stringify(response.json().TotalRequests);
    console.log("Total Requests = "+totalRequest);

        if (totalRequest < 1 || totalRequest == 0 ){
          console.log("Total Request = " +totalRequest+ " (Metric NOT PRESENT)");
        }else{
          console.log("Total Request = " +totalRequest+ " (Metric IS PRESENT)" );
        }

    let adverageTime = JSON.stringify(response.json().AverageTime);
    console.log("Adverage Time = "+adverageTime);

        if (adverageTime < 1 || adverageTime == 0 ){
          console.log("Adverage Time = "+adverageTime+" (Metric NOT PRESENT)" );
        }else{
          console.log("Adverage Time = "+adverageTime+" (Metric IS PRESENT)" );
        }

   });


}