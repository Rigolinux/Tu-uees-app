import React, { useEffect, useState } from "react";

// Invocando componentes de react-native
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Button,
  Alert,
} from "react-native";

// Invocando el componente color
import { colors } from "../../utils/colors";

// Invocando componentes para mostrar los datos
import { Avatar } from "@rneui/themed";
import { ListItem } from "@rneui/themed";
import moment from "moment";

// Invocando la base de datos
import { auth } from "../../backend/firebase";
import { db } from "../../backend/firebase";
import {
  collection,
  doc,
  getDocs,
  where,
  orderBy,
  query,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// Redux
import { useSelector,useDispatch } from "react-redux";
import { starTrip } from "../../src/redux/states/profile";
import { setdataTravel } from "../../src/redux/states/travel/data";
const SchedulesDriverScreen = (props) => {
  
  
 

  

  // Referencia a la colección de horarios
  const horariosRef = collection(db, "Horarios");
  
  //redux
    const dispatch = useDispatch();
  const perfil = useSelector((state) => state.profile);

  const [horarios_prox, setHorarios_prox] = useState([]);

  const horariosAproxLimit = query(
    horariosRef,
    where("correo_del_admin", "==", perfil.correo), // <--- Aquí se debe cambiar el correo del usuario por que va quemado
    where("id_user", "==", perfil.id_user), // <--- Aquí se debe cambiar el id del usuario por que va quemado
    where("state", "==", false),
    orderBy("date_of_travel", "asc")
  );

  // UseEffect - LLamando a los viajes proximos
  // useEffect(() => {
    const getHorariosProx = async () => {
      const horarios_prox = [];
      const querySnapshot = await getDocs(horariosAproxLimit);
      querySnapshot.forEach((doc) => {
        const {
          correo_del_admin,
          date_of_travel,
          id_user,
          state,
          type_of_trip,
        } = doc.data();
        horarios_prox.push({
          id: doc.id,
          correo_del_admin,
          date_of_travel,
          id_user,
          state,
          type_of_trip,
        });
      });
      setHorarios_prox(horarios_prox);
    };
    getHorariosProx();
  // }, []);

  // Mensaje de confirmacion de inicio de viaje
  const openConfirmationAlert = (datosdeviaje) => {
    // const confid = id;

    Alert.alert(
      "Confirmación",
      "¿Desea iniciar el viaje?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        { text: "Si", onPress: () => viajeConfirmado(datosdeviaje) },
      ],
      { cancelable: false }
    );
    // console.log("ID en la opcion de confirmacion", datosdeviaje);
  };

  // Al confirmar:
  // Horarios:
  // 1. Cambiar el "state" a = "true"
  // xx para mientras por que debe de ser En_curso
  // 1. Crear el documento vacio
  // mandarlos a navegacion

  const viajeConfirmado = async (datosdeviaje) => {

    const {
      id,
      correo_del_admin,
      date_of_travel,
      finalizado,
      id_user,
      state,
      type_of_trip,
    } = datosdeviaje;
    const datatravel = {
        id_travel: id,
        type_trip: type_of_trip,
    }
    dispatch(starTrip());
    dispatch(setdataTravel(datatravel));
    // Creando documentos en la coleccion de "en_Curso"
    const en_CursoRef = collection(db, "en_Curso");
    try {
      await setDoc(doc(en_CursoRef, id_user), {
        latitude:         14.2478922,
        longitude:        -89.1311085,
        state:            true,
        statePasanger:    1,
        type_of_trip:     datosdeviaje.type_of_trip,
      });
      console.log("Se creo el documento en la coleccion de en_Curso con exito");
    } catch (error) {
      console.log("Error al crear el documento en la coleccion de en_Curso");
      // Alert.alert("Error", error.message);
    }

    // Actualizando el state en la coleccion de horario
    try {
      const hop = doc(horariosRef, id);
      await updateDoc(hop, {
        state: true,
      });
      console.log("Se actualizo el documento en la coleccion de Horario con exito");
    } catch (error) {
      console.log("Error al actualizar el documento en la coleccion de Horario", error);
      // Alert.alert("Error", error.message);
    }

    // Creando documentos en la coleccion de "Historial"
    const HistorialRef = collection(db, "Historial");
    try {
      await setDoc(doc(HistorialRef, id), {
        correo_del_admin: correo_del_admin,         // <--- Aquí se debe cambiar el correo del usuario por que va quemado
        date_of_travel:   datosdeviaje.date_of_travel,
        finalizado:       false,
        id_user:          id_user,
        state:            true,
        type_of_trip:     datosdeviaje.type_of_trip,
      });
      console.log("Se creo el documento en la coleccion de Historial con exito");
      console.log("Viaje datos, ", datosdeviaje);
    } catch (error) {
      console.log("Error al crear el documento en la coleccion de Historial", error);
      // Alert.alert("Error", error.message);
    }

    // Redireccionando a la pantalla de navegacion y pasando parametros
    //navigation.navigate("Navegacion")
    
    props.navigation.navigate("DriverNavigation", { 
      SDS_id_Horario: datosdeviaje.id,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text
          style={{
            paddingHorizontal: 5,
            paddingVertical: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        ></Text>

        <Text style={{ textAlign: "center", fontSize: 20, padding: 20 }}>
          Horarios De Viajes Pendientes.
        </Text>
      </View>

      <View>
        {horarios_prox.map((horarioprox) => {
          return (
            <ListItem
              key={horarioprox.id}
              bottomDivider
              onPress={() => openConfirmationAlert(horarioprox)}
            >
              <Avatar
                icon={{
                  name: "bus-outline",
                  type: "ionicon",
                  color: "red",
                }}
                size="large"
              />
              <ListItem.Content>
                <ListItem.Title>
                  {"Conductor: "}
                  {horarioprox.correo_del_admin}
                </ListItem.Title>

                <ListItem.Subtitle>
                  {"Identificacion:"} {horarioprox.id_user}
                </ListItem.Subtitle>

                <ListItem.Subtitle>
                  {"Hora de partida:"}{" "}
                  {moment(horarioprox.date_of_travel.toDate()).format("lll")}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </View>
      <Text onPress={()=>console.log(perfil)}>salir</Text>
    </ScrollView>
  );
};

export default SchedulesDriverScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.five,
  },
  listItem: {
    backgroundColor: colors.five,
    marginTop: 10,
  }
})
