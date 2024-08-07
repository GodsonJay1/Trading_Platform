package com.jgc.trading.service;

import com.jgc.trading.model.Coin;
import com.jgc.trading.model.User;
import com.jgc.trading.model.Watchlist;

public interface WatchlistService {

    Watchlist findUserWatchlist(Long userId) throws Exception;

    Watchlist createWatchlist(User user);

    Watchlist findById(Long id) throws Exception;

    Coin addItemToWatchlist(Coin coin, User user) throws Exception;
}
