import React, { useRef, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Animated,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";

export default function Home() {
  // dummy data
  const confirmStatus = "C";
  const pendingStatus = "P";

  let categoriesData = [
    {
      id: 1,
      name: "Education",
      icon: icons.education,
      color: COLORS.yellow,
      expenses: [
        {
          id: 1,
          title: "Tuition Fee",
          description: "Tuition fee",
          location: "ByProgrammers' tuition center",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 2,
          title: "Arduino",
          description: "Hardward",
          location: "ByProgrammers' tuition center",
          total: 30.0,
          status: pendingStatus,
        },
        {
          id: 3,
          title: "Javascript Books",
          description: "Javascript books",
          location: "ByProgrammers' Book Store",
          total: 20.0,
          status: confirmStatus,
        },
        {
          id: 4,
          title: "PHP Books",
          description: "PHP books",
          location: "ByProgrammers' Book Store",
          total: 20.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 2,
      name: "Nutrition",
      icon: icons.food,
      color: COLORS.lightBlue,
      expenses: [
        {
          id: 5,
          title: "Vitamins",
          description: "Vitamin",
          location: "ByProgrammers' Pharmacy",
          total: 25.0,
          status: pendingStatus,
        },

        {
          id: 6,
          title: "Protein powder",
          description: "Protein",
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 3,
      name: "Child",
      icon: icons.baby_car,
      color: COLORS.darkgreen,
      expenses: [
        {
          id: 7,
          title: "Toys",
          description: "toys",
          location: "ByProgrammers' Toy Store",
          total: 25.0,
          status: confirmStatus,
        },
        {
          id: 8,
          title: "Baby Car Seat",
          description: "Baby Car Seat",
          location: "ByProgrammers' Baby Care Store",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 9,
          title: "Pampers",
          description: "Pampers",
          location: "ByProgrammers' Supermarket",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 10,
          title: "Baby T-Shirt",
          description: "T-Shirt",
          location: "ByProgrammers' Fashion Store",
          total: 20.0,
          status: pendingStatus,
        },
      ],
    },
    {
      id: 4,
      name: "Beauty & Care",
      icon: icons.healthcare,
      color: COLORS.peach,
      expenses: [
        {
          id: 11,
          title: "Skin Care product",
          description: "skin care",
          location: "ByProgrammers' Pharmacy",
          total: 10.0,
          status: pendingStatus,
        },
        {
          id: 12,
          title: "Lotion",
          description: "Lotion",
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: confirmStatus,
        },
        {
          id: 13,
          title: "Face Mask",
          description: "Face Mask",
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: pendingStatus,
        },
        {
          id: 14,
          title: "Sunscreen cream",
          description: "Sunscreen cream",
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: pendingStatus,
        },
      ],
    },
    {
      id: 5,
      name: "Sports",
      icon: icons.sports_icon,
      color: COLORS.purple,
      expenses: [
        {
          id: 15,
          title: "Gym Membership",
          description: "Monthly Fee",
          location: "ByProgrammers' Gym",
          total: 45.0,
          status: pendingStatus,
        },
        {
          id: 16,
          title: "Gloves",
          description: "Gym Equipment",
          location: "ByProgrammers' Gym",
          total: 15.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 6,
      name: "Clothing",
      icon: icons.cloth_icon,
      color: COLORS.red,
      expenses: [
        {
          id: 17,
          title: "T-Shirt",
          description: "Plain Color T-Shirt",
          location: "ByProgrammers' Mall",
          total: 20.0,
          status: pendingStatus,
        },
        {
          id: 18,
          title: "Jeans",
          description: "Blue Jeans",
          location: "ByProgrammers' Mall",
          total: 50.0,
          status: confirmStatus,
        },
      ],
    },
  ];

  const categoryListHeightAnimationValue = useRef(new Animated.Value(115))
    .current;

  const [categories, setCategories] = useState(categoriesData);
  const [viewMode, setViewMode] = useState("chart");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showMoreToggle, setShowMoreToggle] = useState(false);

  function renderNavBar() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 80,
          justifyContent: "space-between",
          backgroundColor: COLORS.white,
          alignItems: "flex-end",
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TouchableOpacity style={{ justifyContent: "center", width: 50 }}>
          <Image
            source={icons.back_arrow}
            style={{ width: 30, height: 30, tintColor: COLORS.primary }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            width: 50,
          }}
        >
          <Image
            source={icons.more}
            style={{ width: 30, height: 30, tintColor: COLORS.primary }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View style={{ padding: SIZES.padding, backgroundColor: COLORS.white }}>
        <View>
          <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
            My Expenses
          </Text>
          <Text style={{ color: COLORS.darkgray, ...FONTS.h2 }}>
            Summary (private)
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: COLORS.lightGray,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={icons.calendar}
              style={{ width: 20, height: 20, tintColor: COLORS.lightBlue }}
            />
          </View>

          <View style={{ marginLeft: SIZES.padding }}>
            <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
              {new Date().toLocaleString()}
            </Text>
            <Text style={{ color: COLORS.darkgray, ...FONTS.body3 }}>
              18% more than last month
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderCategoryHeaderSection() {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: SIZES.padding,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ color: COLORS.primary, ...FONTS.H3 }}>CATEGORIES</Text>
          <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>
            {categoriesData.length} Total
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: 50,
              backgroundColor: viewMode === "chart" ? COLORS.secondary : null,
              borderRadius: 25,
            }}
            onPress={() => setViewMode("chart")}
          >
            <Image
              source={icons.chart}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor:
                  viewMode === "chart" ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: 50,
              backgroundColor: viewMode === "list" ? COLORS.secondary : null,
              borderRadius: 25,
            }}
            onPress={() => setViewMode("list")}
          >
            <Image
              source={icons.menu}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode === "list" ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderCategoryList() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            margin: 5,
            paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            ...styles.shadow,
          }}
          onPress={() => setSelectedCategory(item)}
        >
          <Image
            source={item.icon}
            style={{ width: 20, height: 20, tintColor: item.color }}
          />
          <Text
            style={{
              marginLeft: SIZES.base,
              ...FONTS.h4,
              color: COLORS.primary,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
        <Animated.View style={{ height: categoryListHeightAnimationValue }}>
          <FlatList
            data={categories}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={(item) => `${item.id}`}
          />
        </Animated.View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: SIZES.base,
          }}
          onPress={() => {
            if (showMoreToggle) {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 115,
                duarion: 300,
                useNativeDriver: false,
              }).start();
            } else {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 172.5,
                duarion: 300,
                useNativeDriver: false,
              }).start();
            }
            setShowMoreToggle(!showMoreToggle);
          }}
        >
          <Text style={{ ...FONTS.body4 }}>
            {showMoreToggle ? "LESS" : "MORE"}
          </Text>
          <Image
            source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
            style={{
              marginLeft: 5,
              width: 15,
              height: 15,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray2 }}>
      {/* Navigation Section */}
      {renderNavBar()}
      {renderHeader()}
      {renderCategoryHeaderSection()}

      <ScrollView contentStyleContainer={{ paddingBottom: 60 }}>
        {viewMode === "list" && <View>{renderCategoryList()}</View>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
