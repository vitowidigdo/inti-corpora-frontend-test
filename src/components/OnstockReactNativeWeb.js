import React from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { Text } from "react-native-web";

export default function App() {
  // console.log(provinsi);

  function main(arg) {
    let a = 0;
    console.log(
      arg.map((data) => {
        data.map((data) => {
          a += data;
          return a;
        });
        return a;
      })[2]
    );
  }
  main([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);

  //////////////////////// FIND 2 ARRAY THAT ADD NEAR TO 24 /////////////////////////////////////////////
  function mainLogic(arg1, arg2) {
    let dataArray = [];
    arg1.map((test) => {
      return arg2.map((data) => {
        if (data + test == 24 || data + test == 25 || data + test == 23)
          dataArray.push(data, test);
        return dataArray;
      });
    });
    console.log(dataArray);
  }
  mainLogic([-1, 3, 8, 2, 9, 5], [4, 1, 2, 10, 5, 20]);

  //////////////////////// VONIX TEST /////////////////////////////////////////////
  console.log(
    "ventura koin nusantara"
      .split("")
      .filter((item, index) => "ventura koin nusantara".indexOf(item) === index)
      .sort()
      .join("")
  );

  //////////////////////// WARESIX TEST /////////////////////////////////////////////
  function ArrayChallengeSuperIncreasingSequence(arr) {
    // code goes here'
    let total = 0;
    let sup = false;
    for (var i = 0; i < arr.length; i++) {
      if (i !== arr.length - 1) {
        total += arr[i];
      }
      if (arr[i] > total && i === arr.length - 1) {
        sup = true;
      } else if (arr[i] < total && i === arr.length - 1) {
        sup = false;
      }
    }
    return sup;
  }

  function ArrayChallengeIncreaseDecrease(arr) {
    // code goes here
    let ind = 0;
    for (var i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i] && arr[i] < arr[i + 1]) {
        ind = i;
        break;
      } else if (arr[i - 1] < arr[i] && arr[i] > arr[i + 1]) {
        ind = i;
        break;
      } else {
        ind = -1;
      }
    }
    return ind;
  }

  const [first, setFirst] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  async function getCountries(limit) {
    const url = `https://countriesnow.space/api/v0.1/countries/population/cities/filter`;
    setIsLoading(true);
    try {
      fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify({
          limit: limit + 100,
          order: "asc",
          orderBy: "name",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setFirst(json);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getCountries(0);
  }, []);
  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <FlatList
        style={styles.list}
        data={first?.data}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.country} </Text>
          </View>
        )}
        onEndReached={() => getCountries(100)}
        onEndReachedThreshold={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    height: "100%",
  },
  listItem: {
    width: "100%",
    height: "40px",
    padding: "8px",
    alignItems: "flexStart",
  },
});
