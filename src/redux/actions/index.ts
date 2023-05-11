import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../assets/interfaces/user";

export const getUserData = createAsyncThunk(
    "user/getUserInfo",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
            },
            });
    
            if (res.ok) {
            return (await res.json()) as User;
            } else if (res.status === 401) {
            // access token has expired or is invalid, refresh access token
            await refreshAccessToken();
    
            // try to get user data again
            const newAccessToken = localStorage.getItem("accessToken");
            console.log("the updated access", newAccessToken);
            if (newAccessToken) {
                const response = await fetch(
                `${process.env.REACT_APP_BE_URL}/users/me`,
                {
                    headers: {
                    Authorization: `Bearer ${newAccessToken}`,
                    },
                }
                );
                if (response.ok) {
                return (await response.json()) as User;
                }
            }
    
            return thunkAPI.rejectWithValue(new Error("Failed to get user data"));
            } else {
            return thunkAPI.rejectWithValue(new Error("Failed to get user data"));
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "users/getAllUsers",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/users`);
        
            if (res.ok) {
                const data = await res.json() as User[]
                return data
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const allOwnGames = createAsyncThunk(
    "games/allOwnGames",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/games/me/games`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
                }
            })
            if (res.ok) {
                const data = await res.json()
                return data
            } else {
                return thunkAPI.rejectWithValue(new Error("Failed to get your own games"));

            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const sentOffers = createAsyncThunk(
    "offers/sent",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/offers/from/me`, {
                headers: {
                    Authorization:  `Bearer ${window.localStorage.getItem("accessToken")}`,
                }
            })
            if (res.ok) {
                const data = await res.json()
                return data
            } else {
                return thunkAPI.rejectWithValue(new Error("Failed to get offers you sent"));
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const recievedOffers = createAsyncThunk(
    "offers/recieved",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/offers/to/me`, {
                headers: {
                    Authorization:  `Bearer ${window.localStorage.getItem("accessToken")}`,
                }
            })
            if (res.ok) {
                const data = await res.json()
                return data
            } else {
                return thunkAPI.rejectWithValue(new Error("Failed to get offers you recieved"));
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const allGames = createAsyncThunk(
    "games/allGames",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/games/`, {
/*                 headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
                } */
            })
            if (res.ok) {
                const data = await res.json()
                return data.games
            } else {
                return thunkAPI.rejectWithValue(new Error("Failed to get your own games"));

            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const newGameWithImages = createAsyncThunk(
    "games/newGameWithImages",
    async (gameData: {data: {name: string, description: string, asking: number, variance: number}, images: FileList}, thunkAPI) => {
        try {
            console.log("we got", JSON.stringify(gameData.data))
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/games`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(gameData.data)
            })
            if (res.ok) {
                const data = await res.json()

                console.log(data._id)
                const formData = new FormData()
                console.log(Array.from(gameData.images));
                
                Array.from(gameData.images).forEach(f => formData.append("gameimages", f))
                console.log("here we go ahgaiun", formData, gameData.images)
                try {
                    const res = await fetch(`${process.env.REACT_APP_BE_URL}/games/${data._id}/images`, {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
                        },
                        method: "POST",
                        body: formData
                    })
                    if (res.ok) {
                        const game = await res.json()
                        return game
                    }
                } catch (error) {
                    
                }
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const makeOffer = createAsyncThunk(
    "offers/newOffer",
    async (data: {to: string, for: string, offer: string[]}, thunkAPI) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/offers/${data.to}/game/${data.for}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({offer: data.offer})
            })
            if (res.ok) {
                const data = await res.json()

                console.log(data)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/users/session/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            currentRefreshToken: refreshToken,
        }),
    });
    if (response.ok) {
        console.log("response", response);
        const { accessToken, refreshToken } = await response.json();
        console.log("the new refresh token", refreshToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    } else if (response.status === 401) {
        // refresh token has expired, log user out and redirect to login page
        localStorage.setItem("accessToken", "");
        localStorage.setItem("refreshToken", "");
        window.location.href = "/";
    } else {
        console.log("last error");
    }
};
  