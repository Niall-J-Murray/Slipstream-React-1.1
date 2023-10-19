package me.niallmurray.slipstream.repositories;

import me.niallmurray.slipstream.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
  Optional<RefreshToken> findByUserId(Long userId);

  Optional<RefreshToken> findByTokenValue(String tokenValue);
}
